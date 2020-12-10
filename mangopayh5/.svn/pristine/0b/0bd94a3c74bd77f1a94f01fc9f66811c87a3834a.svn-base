// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'	//手动变红
import '../node_modules/element-ui/lib/theme-chalk/index.css'	//手动变红
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import echarts from 'echarts'
//import axios from './Http'
import api from '../static/config.js'
import {SESSION_STORAGE_USER} from "@/utils/ConstUtils.js"
import {SESSION_STOART_MENUS} from "@/utils/ConstUtils.js"
//导入icont图标
import './assets/icon/iconfont.css'
import Qs from 'qs'
Vue.prototype.qs = Qs;
import axios from 'axios';

import '@/assets/scss/styles.scss'; // global css

/*引入资源请求插件*/
import VueResource from 'vue-resource'
import global_ from './components/Global'
Vue.prototype.GLOBAL = global_
/*使用VueResource插件*/
Vue.use(VueResource)

Vue.prototype.api = api;
Vue.prototype.axios = axios
Vue.prototype.$echarts = echarts

axios.defaults.withCredentials=true;

Vue.config.productionTip = false

Vue.use(ElementUI)	//手动变红
Vue.use(VueRouter)
Vue.use(NProgress)
Vue.prototype.$vue = {}
NProgress.configure({ showSpinner: false });

//过滤器
import '@/utils/filters';
//路由拦截器
router.beforeEach((to, from, next) => {
  NProgress.start(); //loading 开始
  if (to.path == '/login') {
    sessionStorage.removeItem(SESSION_STORAGE_USER);
    sessionStorage.removeItem(SESSION_STOART_MENUS);
  }
  let user = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_USER));

  //判断是否需要登录权限
  if(to.matched.some(res => res.meta.requiresAuth)) {
    document.title = to.meta.title;
    // 判断是否登录
    if (!user && to.path != '/login') {
      //没有登录，则跳转登录页面
      next(
        { path: '/login' }
      );
    } else {
      next();
    }
  } else {
    next();
  }

})

router.afterEach(function (to) {
  NProgress.done() //loading结束
})
new Vue({
  el: '#app',
  axios,
  router,
  components: { App },
  template: '<App/>'
})
