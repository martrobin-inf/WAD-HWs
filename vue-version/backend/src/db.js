import pg from "pg";
const { Pool } = pg;

export const pool = new Pool();

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      body TEXT NOT NULL
    );
  `);
}
