import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import NewsFeed from '@/views/NewsFeed.vue'
import LoginForm from '@/components/landing/forms/login/FormLogin.vue'
import SignUpForm from '@/components/landing/forms/registration/FormSignUp.vue'
import VerificationEmailIsSend from '@/components/verification/VerificationEmailIsSend.vue'
import VerificationAccountIsActivated from '@/components/verification/VerificationAccountIsActivated.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      children:[
        {
        path:'/login',
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
    {
      path:'/registration-email',
      name:'registration-email',
      component:VerificationEmailIsSend
    },
    {
      path: '/verify',
      component: VerificationAccountIsActivated,
      props: route => ({ token: route.query.token })
    },
    {
      path:'/home',
      name:"home",
      component:NewsFeed
    }
  ]
})
export default router
