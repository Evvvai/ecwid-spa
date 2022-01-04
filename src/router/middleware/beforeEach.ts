import { Router } from 'vue-router'
import i18n from '@/i18n'

export const middlewareBeforeEach = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    // Need rework
    document.title = String(to.meta.title) || i18n.global.tc('routes.main')
    next()
  })
}
