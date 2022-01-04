import { RouteRecordRaw } from 'vue-router'
import i18n from '@/i18n'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    meta: {
      title: i18n.global.t('routes.main'),
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: i18n.global.t('routes.home'),
        },
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/Cart.vue'),
        meta: {
          title: i18n.global.t('routes.cart'),
        },
      },
      {
        path: '/favorite',
        name: 'favorite',
        component: () => import('@/views/Favorite.vue'),
        meta: {
          title: i18n.global.t('routes.favorite'),
        },
      },
      {
        path: '/category',
        name: 'catalog',
        component: () => import('@/views/Catalog.vue'),
        meta: {
          title: i18n.global.t('routes.catalog'),
        },
      },
      {
        path: '/category/:name',
        name: 'category',
        component: () => import('@/views/Category.vue'),
        meta: {
          title: i18n.global.t('routes.category'),
        },
      },
      {
        path: '/product/:name',
        name: 'product',
        component: () => import('@/views/Product.vue'),
        meta: {
          title: i18n.global.t('routes.product'),
        },
      },
      {
        path: '/:catchAll(.*)',
        name: 'error',
        component: () => import('@/layouts/PageError.vue'),
        meta: {
          title: i18n.global.tc('routes.error'),
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      {
        path: '/signin',
        name: 'signin',
        component: () => import('@/views/SignIn.vue'),
        meta: {
          title: i18n.global.t('routes.signin'),
        },
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/SignUp.vue'),
        meta: {
          title: i18n.global.t('routes.signup'),
        },
      },
    ],
  },
]

export default routes
