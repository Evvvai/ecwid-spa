import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes/'

import { middlewareBeforeEach } from './middleware/beforeEach'
import { middlewareAfterEach } from './middleware/afterEach'

////////////////////////////////////////////////////////////////////////////////////////////////

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

middlewareBeforeEach(router)
middlewareAfterEach(router)

export default router

////////////////////////////////////////////////////////////////////////////////////////////////
