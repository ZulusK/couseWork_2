import axios from 'axios';
import store from '@/store/store'
import globals from '#/globals';

export default () => {
  let args = {};
  args.baseURL = globals.ROOT_URL;
  if (store.getters.isLogged()) {
    args.headers = {Authorization: `Bearer ${store.state.tokens.access}`};
  }
  return axios.create(args)
}
