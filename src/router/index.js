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
        name: 'videoList',
        component: () => import('@/views/video')
      }, {
        path: '/guanxin',
        name: 'guanxinVideoList',
        component: () => import('@/views/video/GuanxinVideoList.vue')
      }, {
        path: '/yuqie',
        name: 'yuqieVideoList',
        component: () => import('@/views/video/YuqieVideoList.vue')
      }, {
        path: '/chanzong',
        name: 'chanzongVideoList',
        component: () => import('@/views/video/ChanzongVideoList.vue')
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
