import { Router } from 'vue-router'
import { localCache } from '@/utils'

// import { store } from "@/store"; // Not yet

export const middlewareAfterEach = (router: Router) => {
  router.afterEach((from) => {
    localCache.addHistory({
      name: from.meta.title,
      url: from.fullPath,
    })

    // Not yet
    // store.commit("action", localCache.getAllHistory(), { root: true });
  })
}
