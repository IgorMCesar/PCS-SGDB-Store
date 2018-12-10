import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'leiloes',
      component: require('@/pages/Leiloes').default,
    },
    {
      path: '/loja',
      name: 'loja',
      component: require('@/pages/Loja').default,
    },
    {
      path: '/leiloar',
      name: 'leiloar',
      component: require('@/pages/Leiloar').default,
    },
    {
      path: '/vender',
      name: 'vender',
      component: require('@/pages/Vender').default,
    },
    {
      path: '/historico',
      name: 'historico',
      component: require('@/pages/Historico').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
