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
  padding: 5px 10px;
  cursor: pointer;
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