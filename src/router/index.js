import Vue from 'vue'
import Router from 'vue-router'
import MyProjects from '@/components/my/Projects'
import TplApi from '@/components/tpl/TplApi'
import TplDiy from '@/components/tpl/TplDiy'
import TplDatabase from '@/components/tpl/TplDatabase'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyProjects',
      component: MyProjects
    },
    {
      path: '/tpl/api',
      name: 'TplApi',
      component: TplApi
    },
    {
      path: '/tpl/diy',
      name: 'TplDiy',
      component: TplDiy
    },
    {
      path: '/tpl/database',
      name: 'TplDatabase',
      component: TplDatabase
    }
  ]
})
