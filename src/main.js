import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css';
Vue.use(vuescroll,{
    ops : {
        bar : {
            background: 'rgba(204, 204, 204, 0.72)',
        }
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
