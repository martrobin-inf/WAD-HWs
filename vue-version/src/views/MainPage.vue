<template>
    <div>
        <AppHeader />
        <button class="logout-btn" @click="logout">Logout</button>
        <div class="posts-list">
            <PostCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
        <div class="post-actions">
          <button @click="$router.push({ name: 'addpost' })">Add Post</button>
          <button @click="deleteAllPosts">Delete All</button>
        </div>
        <AppFooter />
    </div>
</template>

<script>
import AppHeader from '../components/Header.vue'
import AppFooter from '../components/Footer.vue'
import PostCard from '@/components/PostCard.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    AppHeader,
    AppFooter,
    PostCard
  },
  computed: {
    ...mapGetters(['allPosts']),
    posts() {
        return this.allPosts
    }
  },
  methods: {
    resetAllLikes() {
        this.$store.commit('resetLikes')
    },
    logout() {
      localStorage.removeItem('token')
      this.$router.push({ name: 'login' })
    },
    async deleteAllPosts() {
    if (!confirm("Are you sure you want to delete all posts?")) return

    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:3000/posts", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (res.status === 204) {
        alert("All posts deleted!")
        // Clear posts in Vuex store
        this.$store.commit('setPosts', [])
      } else {
        const data = await res.json()
        alert(data.error || "Failed to delete posts")
      }
    } catch (err) {
      console.error(err)
      alert("Server error")
    }
  }
  },
  mounted() {
    this.$store.dispatch('fetchPosts')
  }
}
</script>

<style scoped>
.posts-list {
  margin-top: 20px;
}
button {
  margin-bottom: 15px;
  padding: 10px 15px;
  cursor: pointer;
  background:rgb(234, 196, 107);
  border-radius: 5px;
  border: none;
  font-weight: bold;
}

.logout-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: #ed8484;
  border: none;
  border-radius: 5px;
  font-weight: bold;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  margin: auto;
  max-width: 600px;
}
</style>