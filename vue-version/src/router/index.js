import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import SignUpPage from '../views/SignUpPage.vue'


const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
