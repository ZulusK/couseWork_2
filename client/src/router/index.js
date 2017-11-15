import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import Publications from '@/components/publications/Publications'
import PublicationCreate from '@/components/publications/PublicationCreate'
import PublicationEdit from '@/components/publications/PublicationEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Index
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/publications',
      name: 'publications',
      component: Publications
    },
    {
      path: '/publications/create',
      name: 'publications.create',
      component: PublicationCreate
    },
    {
      path: '/publications/edit',
      name: 'publications.edit',
      component: PublicationEdit
    },
  ]
})
