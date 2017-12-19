import Vue from 'vue'
import Router from 'vue-router'
import Index from '%/Index';
import API from '%/Other/API';
import PersonalArea from '%/user/PersonalArea';
import PublicationsList from '%/Publications/Publications-list';
import PublicationCreate from '%/Publications/Publication-create';
import PublicationView from '%/Publications/Publications-view';
import _404 from '%/globals/404';
import _500 from '%/globals/500';
import Sandbox from '%/code/Sandbox';


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
    {
      path: '/me/',
      name: 'PersonalArea',
      component: PersonalArea
    },
    {
      path: '/publications',
      name: 'Publications-list',
      component: PublicationsList
    },
    {
      path: '/publications/create',
      name: 'Publication-create',
      component: PublicationCreate
    },
    {
      path: '/publications/:id',
      name: 'Publications-view',
      component: PublicationView
    },
    {
      path: '/code',
      name: 'Code',
      component: Sandbox,
    },
    {
      path: '*',
      name: '404',
      component: _404
    },
    {
      path: '/500',
      name: '500',
      component: _500
    }
  ]
})
