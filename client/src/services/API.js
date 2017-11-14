import axios from 'axios'

export default () => {
  return new axios.create({
    baseURL: 'http://localhost:3000'
  })
}
