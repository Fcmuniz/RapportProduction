import Vue from 'vue'
import Router from 'vue-router'
import RapportProduction from '@/components/RapportProduction'
import RapportProductionAction from '@/components/RapportProductionAction'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/RapportProduction',
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
