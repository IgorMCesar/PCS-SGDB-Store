import 'element-ui/lib/theme-chalk/index.css';
import 'vuetify/dist/vuetify.min.css'; // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'font-awesome/css/font-awesome.css';
import locale from 'element-ui/lib/locale/lang/en';

import Vuetify from 'vuetify';
import ElementUI from 'element-ui';
import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';
import i18n from './plugins/i18n/i18n';


Vue.use(ElementUI, { locale });
Vue.use(Vuetify);


if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>',
}).$mount('#app');
