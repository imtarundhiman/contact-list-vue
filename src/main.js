window.axios = require('axios');
import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

import underscore from 'vue-underscore';

Vue.use(underscore)

import App from './App.vue'
import {store} from './store';

import router from "./routes";
import vuetify from './plugins/vuetify';
import './quasar'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  router,
  store: store,
}).$mount('#app')
