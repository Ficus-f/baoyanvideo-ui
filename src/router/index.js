import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import('@/views/course')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import('@/views/resource')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
