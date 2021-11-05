import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import ListeDesRestaurants from './components/ListeDesRestaurants.vue'
import HelloWorld from './components/HelloWorld.vue'
import Restaurant from './components/Restaurant.vue'
import CreateRestaurant from './components/CreateRestaurant.vue'
import About from './components/About.vue'

import Vuetify from 'vuetify';
import "vuetify/dist/vuetify.min.css";
Vue.config.productionTip = false
Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(VueRouter);
Vue.use(Vuetify)


//On définit des routes
const router= new VueRouter({
  routes : [
    {
      path: '/',
      component: ListeDesRestaurants,
    },
    {
      path: '/hello',
      component: HelloWorld,
      props: {
        msg: "coucou"
      }
    },
    {
      path: '/restaurant/:id',
      component: Restaurant
    },
    {
      path: '/CreateRestaurant',
      component: CreateRestaurant,
    },
    {
      path: '/About',
      component: About,
    }
  ],
  mode: 'history'
});
new Vue({
  router,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app')
