import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool, initDb } from "./db.js";
import { requireAuth } from "./auth.js";

const app = express();
app.use(cors());
app.use(express.json());

function signToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
}

// Signup function
app.post("/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const exists = await pool.query(`SELECT id FROM users WHERE email = $1`, [email]);
    if (exists.rows.length > 0) {
      return res.status(409).json({ error: "This email is already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const inserted = await pool.query(
      `INSERT INTO users (email, password)
       VALUES ($1, $2)
       RETURNING id, email`,
      [email, passwordHash]
    );

    const user = inserted.rows[0];
    const token = signToken(user);

    return res.status(201).json({ token });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Login function
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await pool.query(
      `SELECT id, email, password FROM users WHERE email = $1`,
      [email]
    );

    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken({ id: user.id, email: user.email });
    return res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});


// Fetch all posts (home page)
app.get("/posts", requireAuth, async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, date, body
       FROM posts
       ORDER BY id DESC`
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Home page error (GET /posts):", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Fetch one post ("a post" page)
app.get("/posts/:id", requireAuth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

    const result = await pool.query(
      `SELECT id, date, body FROM posts WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "Post not found" });
    return res.json(result.rows[0]);
  } catch (err) {
    console.error("Post error (GET /posts/:id):", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Add a post
app.post("/posts", requireAuth, async (req, res) => {
  try {
    const { body } = req.body;
    if (typeof body !== "string" || !body.trim()) {
      return res.status(400).json({ error: "Post body can not be empty" });
    }

    const result = await pool.query(
      `INSERT INTO posts (body)
       VALUES ($1)
       RETURNING id, date, body`,
      [body.trim()]
    );

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Add a post error (POST /posts):", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Update a post
app.put("/posts/:id", requireAuth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { body } = req.body;

    if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });
    if (typeof body !== "string" || !body.trim()) {
      return res.status(400).json({ error: "Post body can not be empty" });
    }

    const existingPost = await pool.query(`SELECT id FROM posts WHERE id = $1`, [id]);
    if (existingPost.rows.length === 0) return res.status(404).json({ error: "Post not found" });

    const updated = await pool.query(
      `UPDATE posts SET body = $1
       WHERE id = $2
       RETURNING id, date, body`,
      [body.trim(), id]
    );

    return res.json(updated.rows[0]);
  } catch (err) {
    console.error("Update a post error (PUT /posts/:id):", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Delete a post
app.delete("/posts/:id", requireAuth, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

    const existing = await pool.query(`SELECT id FROM posts WHERE id = $1`, [id]);
    if (existing.rows.length === 0) return res.status(404).json({ error: "Post not found" });

    await pool.query(`DELETE FROM posts WHERE id = $1`, [id]);
    return res.sendStatus(204);
  } catch (err) {
    console.error("Delete a post error (DELETE /posts/:id):", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// Delete all posts
app.delete("/posts", requireAuth, async (_req, res) => {
  try {
    await pool.query(`DELETE FROM posts;`);
    return res.sendStatus(204);
  } catch (err) {
    console.error("Delete all posts error (DELETE /posts):", err);
    return res.status(500).json({ error: "Server error" });
  }
});


initDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`API running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB init failed:", err);
    process.exit(1);
  });