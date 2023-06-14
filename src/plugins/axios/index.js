import axios from 'axios'
import { useAuthStore } from '@/stores/useAuthStore.js'

axios.defaults.withCredentials = true

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest'
  }
})
axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response === 401) {
      let authStore = useAuthStore()
      authStore.authenticateOrLogoutUser(false)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
