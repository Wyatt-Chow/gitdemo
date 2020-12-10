import Vue from 'vue'
import App from './App'
import store from './store'
App.mpType = 'app'

/*自定义模块*/
import http from './net/httpManager.js'
import dateUtils from "./static/js/date.js"
import quickLogin from "./net/quickLogin.js"

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$http = http
Vue.prototype.dateUtils = dateUtils
Vue.prototype.$quickLogin = quickLogin

const app = new Vue({
	store,
    ...App
})
app.$mount()