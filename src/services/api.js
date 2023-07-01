import axios from '@/plugins/axios/index.js'

export async function register(name, email, password, password_confirmation) {
  return await axios.post(
    'users/register',
    {
      username: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    },
    { timeout: 8000 }
  )
}

export async function sendVerificationEmail(token) {
  return await axios.post('users/email-verification', {
    token: token
  })
}

export async function resendVerificationEmail(token) {
  return await axios.post(
    'users/resend-verification-email',
    {
      token: token
    },
    { timeout: 5000 }
  )
}

export async function forgotPassword(email) {
  return await axios.post(
    'reset-password/email',
    {
      email: email
    },
    {
      timeout: 8000
    }
  )
}

export async function resetPassword(token, password, password_confirmation) {
  return await axios.post(
    'reset-password/change',
    {
      token: token,
      password: password,
      password_confirmation: password_confirmation
    },
    {
      timeout: 8000
    }
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

export async function getAuthenticatedUser() {
  return await axios.get('users/user')
}

export async function getQuotes(page) {
  return await axios.get('quotes', {
    params: { page: page }
  })
}

export async function likeQuote(quote_id, user_id) {
  return await axios.post(
    '/like-quote',
    {
      quote_id: quote_id,
      user_id: user_id
    },
    { timeout: 8000 }
  )
}

export async function writeComment(quote_id, user_id, comment) {
  return await axios.post(
    '/write-comment',
    {
      quote_id: quote_id,
      user_id: user_id,
      body: comment.value
    },
    { timeout: 6000 }
  )
}

export async function changeEmail(token, email) {
  return await axios.post('/change-email', {
    token: token,
    email: email
  })
}

export async function changeUserPersonalInfo(personalInfoFormData) {
  return await axios.post('edit/user/' + localStorage.getItem('authUserId'), personalInfoFormData, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}

// Movie & Quote CRUD

export async function getMovies(pageParams) {
  return await axios.get('movies', {
    params: { page: pageParams }
  })
}

export async function getSingleMovie(movieId) {
  return await axios.get('movies/' + movieId)
}

export async function addMovie(movieInfoForm) {
  return await axios.post('create-movie', movieInfoForm, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}

export async function editMovieRequest(movieId, movieEditedInfoForm) {
  return await axios.post('movies/edit/' + movieId, movieEditedInfoForm, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}

export async function deleteMovie(movieId) {
  return await axios.delete('movies/delete/' + movieId)
}

export async function deleteQuote(quoteId) {
  return await axios.delete('quotes/delete/' + quoteId)
}
export async function getSingleQuote(quoteId) {
  return await axios.get('/quotes/' + quoteId)
}
export async function editQuoteRequest(quoteId, quoteEditedInfoForm) {
  return await axios.post('quotes/edit/' + quoteId, quoteEditedInfoForm, {
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}
