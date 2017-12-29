import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/layout/index'
import List from '@/layout/list'
import Add from '@/layout/add'
import Bus from '../router/eventBus.js';
Vue.use(Router)

export const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/list',
      name: 'list',
      component: List,
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    }
  ],
})


router.beforeEach((to, from, next) => {
    // ...
    if(to.name=="list"){
      Bus.$emit('isEdit',true);
    }
    if(from.name=="list"){
      Bus.$emit('isEdit',false);
    }
    next();
})
