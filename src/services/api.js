import axios from '@/plugins/axios/index.js'

export async function register(name, email, password, password_confirmation) {
  return await axios.post(
    'users/create',
    {
      username: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    },
    { timeout: 8000 }
  )
}

export async function login(email, password, rememberMe) {
  return await axios.post('users/login', {
    email: email,
    password: password,
    rememberMe: rememberMe
  })
}

export async function logout(action) {
  return axios.post('logout', {
    action: action
  })
}

export async function googleAuth() {
  return await axios.get('/google/auth', {
    timeout: 8000
  })
}

export async function checkIfUserIsAuthenticated() {
  return await axios.get('/auth-check')
}

export async function getAuthenticatedUser() {
  return await axios.get('users/user')
}
