import { createRouter, createWebHashHistory } from 'vue-router'
import userLayout from '@/layouts/userLayout.vue'
import MenuLayout from '@/layouts/MenuLayout.vue'
const routes = [
  {
    path: '/',
    component: MenuLayout,
    redirect: '/',
    children: [
      {
        path:'/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "首页" */ '../views/home/index.vue')
      },
      {
        path:'/customer',
        name: 'Customer',
        component: () => import(/* webpackChunkName: "customer" */ '../views/user/customer/index.vue')
      },
      {
        path:'/admin',
        name: 'Admin',
        component: () => import(/* webpackChunkName: "admin" */ '../views/user/admin/index.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    component: userLayout,
    redirect: '/login',
    children:[
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '../views/user/login/index.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
