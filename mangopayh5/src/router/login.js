export default [
  {
    path: '/login',
    name: 'Login',
    component: resolve => require(['@/pages/login/login'], resolve),
    meta: {
      title: '',
      requiresAuth: false
    }
  },
  {
    path: '/loanlogin',
    name: 'Login',
    component: resolve => require(['@/pages/login/loanlogin'], resolve),
    meta: {
      title: '',
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'Login',
    component: resolve => require(['@/pages/login/login'], resolve), // 懒加载 *.vue文件
    meta: {
      title: '登录页面',
      requiresAuth: false
    }
  }
]
