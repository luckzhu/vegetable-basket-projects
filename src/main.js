import Vue from 'vue'

import 'normalize.css/normalize.css' // CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // 全局css

import App from './App.vue'

Vue.use(ElementUI)

import router from './router'
import store from './store'

import './icons'
import './permission' // 权限控制

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
