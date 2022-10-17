import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'videoList',
        component: () => import('@/views/video')
      }
    ]
  },
  {
    path: '/video/:videoID',
    name: 'showVideo',
    component: () => import('@/views/show')
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/views/upload')
  }
]

const router = new VueRouter({
  routes
})

export default router
