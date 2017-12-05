// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css';
//weather Icon
import "./assets/weather-icons.min.css";

//iview
import { Button, Icon } from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(VueAwesomeSwiper, /* { default global options } */)


Vue.component('Button', Button);
Vue.component('Icon', Icon);



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
