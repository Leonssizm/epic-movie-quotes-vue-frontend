import { useAuthStore } from '@/stores/useAuthStore.js'
import { useRouter } from 'vue-router'

export function isAuthenticated() {
  let store = useAuthStore()
  if (!store.authenticated) {
    return '/forbidden'
  }
}

export function loggedIn() {
  const router = useRouter()
  let store = useAuthStore()

  if (store.authenticated && router.currentRoute.value.path === '/') {
    return '/home'
  }
}
