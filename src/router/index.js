import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import LoginForm from '@/components/landing/forms/FormLogin.vue'
import SignUpForm from '@/components/landing/forms/FormSignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      children:[
        {
        path:'login',
        name:'login',
        component: LoginForm,
        },
        {
        path:'/sign-up',
        name:'sign-up',
        component: SignUpForm,
        }
    ]
    },
  ]
})

export default router
