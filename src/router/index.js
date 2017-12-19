import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/layout/index'
import List from '@/layout/list'
import Add from '@/layout/add'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/list'
    },
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    }
  ]
})
