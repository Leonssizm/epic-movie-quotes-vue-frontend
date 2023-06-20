import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/router/guards.js'
import LandingView from '@/views/LandingView.vue'
import HomePage from '@/views/HomePage.vue'
import GoogleAuthComponent from '@/components/GoogleAuthComponent.vue'
import LoginForm from '@/components/landing/forms/login/FormLogin.vue'
import SignUpForm from '@/components/landing/forms/registration/FormSignUp.vue'
import GuardUnauthorized from '@/components/navigationGuards/GuardUnauthorized.vue'
import VerificationAccountIsActivated from '@/components/verification/VerificationAccountIsActivated.vue'
import ForgotPasswordModal from '@/components/verification/forgotPassword/ForgotPasswordModal.vue'
import ForgotPasswordResetForm from '@/components/verification/forgotPassword/ForgotPasswordResetForm.vue'
import UserProfileEditPage from '@/components/home/userProfile/UserProfileEditPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      children: [
        {
          path: '/login',
          name: 'login',
          component: LoginForm
        },
        {
          path: '/sign-up',
          name: 'sign-up',
          component: SignUpForm
        }
      ]
    },
    // verify user from email
    {
      path: '/verify',
      component: VerificationAccountIsActivated,
      props: (route) => ({ token: route.query.token })
    },
    // user forgot password paths
    {
      path: '/password-reset',
      name: 'password-reset',
      component: ForgotPasswordModal
    },
    {
      path: '/verify-password',
      component: ForgotPasswordResetForm,
      props: (route) => ({ token: route.query.token })
    },
    // Google auth
    {
      path: '/auth/google/call-back/:id',
      name: 'google-auth-callback',
      component: GoogleAuthComponent
    },
    // Homepage
    {
      path: '/home',
      name: 'home',
      component: HomePage,
      meta: {
        requiresAuth: true
      },
      beforeEnter: [isAuthenticated]
    },
    {
      path: '/edit-profile',
      name: 'profile',
      component: UserProfileEditPage,
      beforeEnter: [isAuthenticated]
    },

    // navigation-guards
    {
      path: '/forbidden',
      name: 'forbidden',
      component: GuardUnauthorized
    }
  ]
})

export default router
