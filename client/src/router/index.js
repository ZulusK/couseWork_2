import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Publications from '@/components/Publications'
import PublicationCreate from '@/components/PublicationCreate'

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
      name: 'publicationCreate',
      component: PublicationCreate
    },
  ]
})
