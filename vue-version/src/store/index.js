import { createStore } from 'vuex'

export default createStore({
  state: {
    posts: []
  },
  getters: {
    allPosts: state => state.posts
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    incrementLike(state, postId) {
      const post = state.posts.find(p => p.id === postId)
      if (post) post.likes++
    },
    resetLikes(state) {
      state.posts.forEach(p => p.likes = 0)
    }
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/6924f1acae596e708f6ec23e?meta=false')
        const data = await response.json()

        commit('setPosts', data)
      } catch (error) {
        console.error("Failed to fetch posts: ", error)
      }
    }
  },
  modules: {
  }
})
