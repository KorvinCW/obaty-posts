import { createRouter, createWebHistory } from 'vue-router'
import AllPostsView from '../components/Posts.vue'

const routes = [
  {
    path: '/',
    name: 'Posts',
    component: AllPostsView
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../components/PersonalProfile.vue')
  },
  {
    path: '/new-post',
    name: 'new-post',
    component: () => import('../components/PostForm.vue')
  },
  {
    path: '/post-form/:id',
    name: 'post-form',
    component: () => import('../components/PostForm.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
