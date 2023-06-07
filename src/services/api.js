import axios from '@/plugins/axios/index.js'

export async function register(name, email, password, password_confirmation){
  const response = await axios
  .post(
    'users/create',
    {
      username: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    },
    { timeout: 8000 }
  )
  return response;
}

export async function login(email, password, rememberMe){
    const response = await  axios.post('users/login', {
      email: email,
      password: password,
      rememberMe: rememberMe
    })
    return response;
}

export async function logout(action){
    axios
    .post('logout', {
      action: action
    })
}


export async function googleAuth(){
 const response =  axios
  .get('/google/auth', {
    timeout: 8000
  })

  return response
}


export async function checkIfUserIsAuthenticated(){
    const response = await axios.get('/auth-check');
    
    return response
} 

export async function getAuthenticatedUser(){
  const response = await axios.get('users/user')

  return response.data
}