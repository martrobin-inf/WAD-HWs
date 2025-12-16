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
        const token = localStorage.getItem("token")

        if (!token) {
          console.warn("No token found")
          return
        }

        const res = await fetch("http://localhost:3000/posts", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })

        if (!res.ok) {
          throw new Error("Failed to fetch posts")
        }

        const data = await res.json()
        commit("setPosts", data)
      } catch (error) {
        console.error("Failed to fetch posts: ", error)
      }
    }
  },
  modules: {
  }
})
