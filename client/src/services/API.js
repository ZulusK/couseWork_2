import axios from 'axios'
import store from '@/store/store'

export default () => {
  return new axios.create({
    baseURL: (process.env.NODE_ENV.startsWith('dev'))?'http://localhost:3000':'http://codual.herokuapp.com',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
