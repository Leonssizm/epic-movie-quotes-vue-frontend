import axios from '@/plugins/axios/index.js'


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


// Request for sanctum testing purposes

export async function getNewsFeed(){
    const response = await axios.get('/newsfeed');

    return response.data
} 