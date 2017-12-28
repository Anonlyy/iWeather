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
      beforeEnter:(to, from, next) => {
        // ...
        console.log(to);
        if(to.name=="list"){
          console.log('编辑模式');
          Bus.$emit('edit',111);
        }
        next();
      }
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    }
  ],

})


