<template>
  <div>
    <AppHeader />

    <div class="addpost-container">
      <div class="post-box">
        <h2>Add post</h2>

        <div class="row">
          <label for="postBody">Post body</label>
          <textarea 
            id="postBody" 
            v-model="body" 
            maxlength="100" 
            placeholder="Write your post here..."
          ></textarea>
        </div>

        <button class="create-btn" @click="submitPost">Create Post</button>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "../components/Header.vue"
import AppFooter from "../components/Footer.vue"

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      body: ""
    }
  },
  methods: {
    async submitPost() {
      if (!this.body.trim()) {
        alert("Post body cannot be empty!")
        return
      }

      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ body: this.body.trim() })
        })

        if (res.status === 201) {
          const newPost = await res.json()
          alert("Post created!")
          this.body = ""
          this.$store.dispatch('fetchPosts') // update Vuex store
          this.$router.push({ name: 'main' }) // go back to main page
        } else {
          const data = await res.json()
          alert(data.error || "Failed to create post")
        }
      } catch (err) {
        console.error(err)
        alert("Server error")
      }
    }
  }
}
</script>

<style scoped>
.addpost-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.post-box {
  background: #e8f6d9;
  padding: 25px 30px;
  border-radius: 12px;
  width: 400px;
}

.row {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  font-weight: 600;
}

textarea {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #bbb;
  min-height: 100px;
  resize: vertical;
}

.create-btn {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background: #8db7ff;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
}
</style>