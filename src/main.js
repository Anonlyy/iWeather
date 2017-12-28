// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/getData'
import vuex from 'vuex'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueCookies from 'vue-cookies'
import "babel-polyfill";
// require styles
import 'swiper/dist/css/swiper.css';
//weather Icon
import "./assets/weather-icons.min.css";

import 'vueg/css/transition-min.css'
import vueg from 'vueg'
//iview
import { Button, Icon,Spin,Input,Message,Modal } from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(VueCookies);
Vue.use(vuex);
const options={
  duration: '0.5',              //转场动画时长，默认为0.3，单位秒
  firstEntryDisable: false,     //值为true时禁用首次进入应用时的渐现动画，默认为false
  firstEntryDuration: '0',     //首次进入应用时的渐现动画时长，默认为.6
  forwardAnim: 'slideInRight',   //前进动画，默认为fadeInRight
  backAnim: 'slideInLeft',       //后退动画，默认为fedeInLeft
  sameDepthDisable: false,      //url深度相同时禁用动画，默认为false
  shadow:false,                  //值为false，转场时没有阴影的层次效果
  disable: false,               //禁用转场动画，默认为false，嵌套路由默认为true
}
Vue.use(vueg, router,options);

Vue.component('Button', Button);
Vue.component('Icon', Icon);
Vue.component('Spin', Spin);
Vue.component('Input', Input);
Vue.component('Modal', Modal);
Vue.prototype.api = api;
Vue.prototype.$Message = Message;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
