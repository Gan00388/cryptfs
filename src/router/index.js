import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CryptoView from '../views/CryptoView.vue'
import KeyRegist from '../components/Crypto/KeyRegist.vue'
import SendFile from '../components/Crypto/SendFile.vue'
import RevFile from '../components/Crypto/RevFile.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/system',
    name: 'System',
    redirect: '/system/users',
    component: () => import('../views/system/System.vue'),
    children: [
      { path: '/system/users', component: () => import('../views/system/UserManagement'), meta: { requiresAuth: true } },
      { path: '/system/log', component: () => import('../views/system/Log'), meta: { requiresAuth: true } },
      { path: '/system/file_transfer', component: () => import('../views/system/FileTransfer'), meta: { requiresAuth: true } },
    ]
  },
  {
    path: '/Crypto',
    name: 'Crypto',
    redirect: '/Crypto/KeyRegist',
    component: CryptoView,
    children: [
      {
        path: 'SendFile',
        name: 'SendFile',
        component: SendFile,
        meta: { requiresAuth: true },
      },
      {
        path: 'RevFile',
        name: 'RevFile',
        component: RevFile,
        meta: { requiresAuth: true },
      },
      {
        path: 'KeyRegist',
        name: 'KeyRegist',
        component: KeyRegist,
        meta: { requiresAuth: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/Register') {
    next()
  }
  if (to.meta.requiresAuth && !sessionStorage.getItem('token')) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
