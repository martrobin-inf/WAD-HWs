<template>
    <div>
        <AppHeader />
        <h2>Main Page</h2>
        <div class="posts-list">
            <PostCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
        <button @click="resetAllLikes">Reset Likes</button>
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
</style>