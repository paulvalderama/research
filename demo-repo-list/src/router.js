import Vue from 'vue';
import Router from 'vue-router';
import Repos from './components/Repos.vue';
import About from './components/About.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'repos',
      component: Repos
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
