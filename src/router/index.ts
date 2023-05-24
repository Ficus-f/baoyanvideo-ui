import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
  {
    path: "/404",
    component: () => import("@/views/error/404.vue"),
  },
  {
    path: "/",
    name: "yin-container",
    component: () => import("@/views/BaoyanContainer.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/sign-in",
        name: "sign-in",
        component: () => import("@/views/SignIn.vue"),
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () => import("@/views/SignUp.vue"),
      },
      {
        path: "/personal",
        name: "personal",
        meta: {
          requireAuth: true,
        },
        component: () => import("@/views/personal/Personal.vue"),
      },
      {
        path: "/kid",
        name: "kid",
        component: () => import("@/views/kid/Kid.vue"),
      },
      // {
      //   path: "/course-detail/:id",
      //   name: "course-detail",
      //   component: () => import("@/views/course/CourseDetail.vue"),
      // },
      {
        path: "/course",
        name: "course",
        component: () => import("@/views/course/Course.vue"),
      },
      {
        path: "/course-detail/:id",
        name: "course-detail",
        component: () => import("@/views/course/CourseDetail.vue"),
      },
      {
        path: "/guru",
        name: "guru",
        component: () => import("@/views/guru/Guru.vue"),
      },
      {
        path: "/guru-detail/:id",
        name: "guru-detail",
        component: () => import("@/views/guru/GuruDetail.vue"),
      },
      {
        path: "/video/:id",
        name: "video",
        component: () => import("@/views/video/Video.vue"),
      },
      {
        path: "/search",
        name: "search",
        component: () => import("@/views/search/Search.vue"),
      },
      {
        path: "/personal-data",
        name: "personal-data",
        component: () => import("@/views/setting/PersonalData.vue"),
      },
      {
        path: "/setting",
        name: "setting",
        meta: {
          requireAuth: true,
        },
        component: () => import("@/views/setting/Setting.vue"),
        children: [
          {
            path: "/setting/PersonalData",
            name: "personalData",
            meta: {
              requireAuth: true,
            },
            component: () => import("@/views/setting/PersonalData.vue"),
          }
        ]
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
