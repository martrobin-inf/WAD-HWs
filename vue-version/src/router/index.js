import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import LoginPage from '../views/LoginPage.vue'


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
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
