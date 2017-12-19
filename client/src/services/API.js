import axios from 'axios';
import globals from '#/globals';
import store from '@/store/store';

export default {
  basic (username, password) {
    let args = {};
    args.baseURL = globals.ROOT_URL;
    args.auth = {
      username: username,
      password: password
    }
    console.log(4)
    return axios.create(args)
  },
  access () {
    let args = {};
    args.baseURL = globals.ROOT_URL;
    if (store.getters.isLogged()) {
      args.headers = {Authorization: `Bearer ${store.state.tokens.access}`};
    }
    return axios.create(args)
  },
  refresh () {
    let args = {};
    args.baseURL = globals.ROOT_URL;
    if (store.getters.isLogged()) {
      args.headers = {Authorization: `Bearer ${store.state.tokens.refresh}`};
    }
    return axios.create(args)
  },
  noAuth () {
    let args = {};
    args.baseURL = globals.ROOT_URL;
    args.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    return axios.create(args)
  }
}
