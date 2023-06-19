import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authenticated', {
  state: () => ({
    authenticated: JSON.parse(localStorage.getItem('authenticated')),
    authenticatedUser: []
  }),
  actions: {
    authenticateOrLogoutUser(status) {
      if (status === true) {
        this.authenticated = status
        localStorage.setItem('authenticated', status)
      } else {
        this.authenticated = status
        localStorage.removeItem('authenticated')
        localStorage.setItem('authenticated', status)
      }
      this.authenticated = status
    },
    initAuthUser(user) {
      this.authenticatedUser = user
      localStorage.setItem('authUserId', user.id)
    }
  }
})
