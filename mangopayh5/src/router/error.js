export default [
  {
    path: '/404',
    component: resolve => require(['@/pages/error/404'], resolve),
    name: '',
    meta: {
      title: '404 NOT FONUT!',
      requiresAuth: true
    }
  },
  {
    path: '/*',
    name: '',
    component: resolve => require(['@/pages/error/404'], resolve),
    meta: {
      title: '404 NOT FONUT!',
      requiresAuth: false
    }
  }
]
