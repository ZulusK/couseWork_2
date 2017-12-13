import Vue from 'vue'
import Router from 'vue-router'
import Index from '%/Index';
import API from '%/Other/API';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/api/v1/docs',
      name: 'API',
      component: API
    },
  ]
})
