import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import LoginPage from '../views/LoginPage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import ContactsPage from '../views/ContactsPage.vue'
import AddPostPage from '../views/AddPostPage.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },

  {
    path: '/signup',
    name: 'signup',
    component: SignUpPage
  },

  {
    path: '/addpost',
    name: 'addpost',
    component: AddPostPage
  },

  {
    path: '/contacts',
    name: 'contacts',
    component: ContactsPage
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// security

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.name === 'main' && !token) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
