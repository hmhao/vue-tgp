import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const IndexView = () => import('@/views/IndexView.vue')
const ListView = () => import('@/views/ListView.vue')
const CategoryView = () => import('@/views/CategoryView.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    routes: [{
      path: '/',
      redirect: '/index'
    }, {
      path: '/index',
      component: IndexView
    }, {
      path: '/list',
      redirect: '/list/renqi'
    }, {
      path: '/list/:type',
      component: ListView,
      props: true
    }, {
      path: '/category',
      component: CategoryView
    }]
  })
}
