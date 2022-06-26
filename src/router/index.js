import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const Question = () => import('@/views/Question')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    component: Layout,
    children: [
      { path: '/Home', component: Home },
      { path: '/Video', component: Video },
      { path: '/Question', component: Question },
      { path: '/My', component: My }

    ]
  },
  { path: '/Login', component: Login }
]

const router = new VueRouter({
  routes
})

export default router
