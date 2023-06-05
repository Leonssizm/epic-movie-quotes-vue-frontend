import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import NewsFeed from '@/views/NewsFeed.vue'
import GoogleAuthComponent from '@/components/GoogleAuthComponent.vue'
import LoginForm from '@/components/landing/forms/login/FormLogin.vue'
import SignUpForm from '@/components/landing/forms/registration/FormSignUp.vue'
import VerificationEmailIsSend from '@/components/verification/VerificationEmailIsSend.vue'
import VerificationAccountIsActivated from '@/components/verification/VerificationAccountIsActivated.vue'
import ForgotPasswordModal from '@/components/verification/forgotPassword/ForgotPasswordModal.vue'
import ForgotPasswordEmail from '@/components/verification/forgotPassword/ForgotPasswordEmail.vue'
import ForgotPasswordResetForm from '@/components/verification/forgotPassword/ForgotPasswordResetForm.vue'
import ForgotPasswordSuccess from '@/components/verification/forgotPassword/ForgotPasswordSuccess.vue'
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
    // user sign-up email paths
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
    // user forgot password paths
    {
      path:'/password-reset',
      name:'password-reset',
      component:ForgotPasswordModal
    },
    {
      path:'/reset-email',
      name:'reset-email',
      component:ForgotPasswordEmail
    },
    {
      path: '/verify-password',
      component: ForgotPasswordResetForm,
      props: route => ({ token: route.query.token })
    },
    {
      path: '/password-changed',
      name:'password-changed',
      component: ForgotPasswordSuccess,
    },
    // Google auth

    {
      path: '/auth/google/call-back/:id',
      name:'google-auth-callback',
      component: GoogleAuthComponent,
    },
    
    {
      path:'/home',
      name:"home",
      component:NewsFeed
    }
  ]
})
export default router
