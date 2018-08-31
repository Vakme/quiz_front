import '@babel/polyfill'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'

axios.defaults.baseURL = 'http://zti-cloud.westeurope.cloudapp.azure.com/zti-1.0-SNAPSHOT'

Vue.use(Vuelidate)
Vue.use(Notifications)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
