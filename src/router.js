import Vue from 'vue'
import Router from 'vue-router'
import RapportProduction from './views/RapportProduction.vue'
import RapportProductionAction from '@/components/Teste/teste'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'RapportProduction',
      component: RapportProduction
    },
    {
      path: '/RapportProductionAction',
      name: 'RapportProductionAction',
      component: RapportProductionAction
     },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
