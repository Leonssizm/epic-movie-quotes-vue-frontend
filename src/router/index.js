import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/router/guards.js'
import LandingView from '@/views/LandingView.vue'
import HomePage from '@/views/HomePage.vue'
import MoviePage from '@/views/MoviePage.vue'
import LoginForm from '@/components/landing/forms/login/FormLogin.vue'
import SignUpForm from '@/components/landing/forms/registration/FormSignUp.vue'
import GuardUnauthorized from '@/components/navigationGuards/GuardUnauthorized.vue'
import VerificationAccountIsActivated from '@/components/verification/VerificationAccountIsActivated.vue'
import ForgotPasswordModal from '@/components/verification/forgotPassword/ForgotPasswordModal.vue'
import ForgotPasswordResetForm from '@/components/verification/forgotPassword/ForgotPasswordResetForm.vue'
import UserProfileEditPage from '@/components/home/userProfile/UserProfileEditPage.vue'
import VerificationChangeEmail from '@/components/verification/VerificationChangeEmail.vue'
import VerificationEmailIsChanged from '@/components/verification/VerificationEmailIsChanged.vue'
import MovieListAddModal from '@/components/home/movieList/forms/MovieListAddMovieModal.vue'
import MovieListCard from '@/components/home/movieList/MovieListCard.vue'
import MovieListIndividualMovie from '@/components/home/movieList/MovieListIndividualMovie.vue'
import MovieListIndividualQuote from '@/components/home/movieList/MovieListIndividualQuote.vue'
import MovieListEditQuote from '@/components/home/movieList/forms/MovieListEditQuote.vue'
import NewsFeedAddQuoteModal from '@/components/home/newsFeed/NewsFeedAddQuoteModal.vue'
import MovieListEditMovie from '@/components/home/movieList/forms/MovieListEditMovie.vue'
import GuardNotFound from '@/components/navigationGuards/GuardNotFound.vue'
import { loggedIn } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      beforeEnter: [loggedIn],
      meta: {
        requiresAuth: false
      },
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
      component: HomePage
    },
    // Homepage
    {
      path: '/home',
      name: 'home',
      component: HomePage,
      meta: {
        requiresAuth: true
      },
      beforeEnter: [isAuthenticated],
      children: [
        {
          path: 'add-quote',
          name: 'add-quote',
          component: NewsFeedAddQuoteModal
        }
      ]
    },
    // user profile
    {
      path: '/edit-profile',
      name: 'profile',
      component: UserProfileEditPage,
      beforeEnter: [isAuthenticated]
    },
    {
      path: '/verify-new-email',
      component: VerificationEmailIsChanged,
      props: (route) => ({ token: route.query.token, email: route.query.email }),
      beforeEnter: [isAuthenticated]
    },
    {
      path: '/change-email',
      name: 'change-email',
      component: VerificationChangeEmail,
      beforeEnter: [isAuthenticated]
    },
    // Movie page
    {
      path: '/movies',
      name: 'movies',
      component: MoviePage,
      meta: {
        requiresAuth: true
      },
      beforeEnter: [isAuthenticated],
      children: [
        {
          path: 'list',
          name: 'movies-list',
          component: MovieListCard,
          children: [
            {
              path: 'add-movie',
              name: 'add-movie',
              component: MovieListAddModal
            }
          ]
        },
        {
          path: 'movie/:id',
          name: 'movie',
          component: MovieListIndividualMovie
        },
        {
          path: '/quotes/:id',
          name: 'individual-quote',
          component: MovieListIndividualQuote
        },
        {
          path: '/quotes/:id/edit',
          name: 'edit-quote',
          component: MovieListEditQuote
        },
        {
          path: '/movies/:id/edit',
          name: 'edit-movie',
          component: MovieListEditMovie
        }
      ]
    },

    // navigation-guards
    {
      path: '/forbidden',
      name: 'forbidden',
      component: GuardUnauthorized
    },
    {
      path: '/:pathMatch(.*)*',
      component: GuardNotFound
    }
  ]
})

export default router
