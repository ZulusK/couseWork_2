import axios from 'axios'
import store from '@/store/store'

export default () => {
  return new axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
