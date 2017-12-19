import Vue from 'vue'
import Router from 'vue-router'
import Index from '%/Index';
import API from '%/Other/API';
import PersonalArea from '%/user/PersonalArea';
import PublicationCreate from '%/Publications/Publication-create';
import PublicationView from '%/Publications/Publications-view';
import PublicationList from '%/Publications/Publications-list';
import _404 from '%/globals/404';
import _500 from '%/globals/500';
import Workspace from '%/code/Workspace';
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
      children: [
        {
          path: '',
          name: 'Publications-list',
          component: PublicationList,
        },
        {
          path: 'create',
          name: 'Publication-create',
          component: PublicationCreate
        },
        {
          path: ':id',
          name: 'Publications-view',
          component: PublicationView
        },
      ]
    },
    {
      path: '/code',
      name: 'Code',
      components: Sandbox,
      children: [
        {
          path: 'workspace',
          name: 'Code-workspace',
          components: Workspace
        },
      ]
    },
    {
      path: '/ '
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
