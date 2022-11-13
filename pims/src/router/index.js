import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Main'),
    children: [
      {
        path: 'friend',
        name: 'friend',
        component: () => import('@/views/Friends')
      },
      {
        path: 'me',
        name: 'me',
        component: () => import('@/views/Me')
      },
      {
        path: 'todo',
        name: 'todo',
        component: () => import('@/views/TodoList')
      },
      {
        path: 'memo',
        name: 'memo',
        component: () => import('@/views/Memo')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register')
  }
]

const router = new VueRouter({
  routes
})

export default router
