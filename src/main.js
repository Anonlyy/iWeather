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

//iview
import { Button, Icon,Spin,Input,Message,Modal } from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(VueCookies);
Vue.use(vuex);

Vue.component('Button', Button);
Vue.component('Icon', Icon);
Vue.component('Spin', Spin);
Vue.component('Input', Input);
Vue.component('Modal', Modal);
Vue.prototype.api = api;
Vue.prototype.$Message = Message;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
