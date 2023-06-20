import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import axios from '@/plugins/axios/index.js'

export default function instantiatePusher() {
  window.Pusher = Pusher
  window.Echo = new Echo({
    authEndpoint: `${import.meta.env.VITE_API_BASE_URL}broadcasting/auth`,
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_KEY,
    forceTLS: true,
    cluster: ['eu'],
    authorizer: (channel) => {
      return {
        authorize: (socketId, callback) => {
          axios
            .post(
              'broadcasting/auth',
              {
                socket_id: socketId,
                channel_name: channel.name
              },
              { withCredentials: true }
            )
            .then((response) => {
              callback(null, response.data)
            })
            .catch((error) => {
              callback(error)
            })
        }
      }
    }
  })
}
