import { useAuthStore } from '@/stores/useAuthStore.js'

export function isAuthenticated() {
  let store = useAuthStore()
  if (!store.authenticated) {
    return '/forbidden'
  }
}
