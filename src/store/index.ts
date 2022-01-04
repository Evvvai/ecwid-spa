import i18n from '@/i18n'
import { Locales, Theme, ViewportCategory, ViewportCategorySize } from '@/types'
import { AppState } from '@/types/store'
import { browserStorage, debounce } from '@/utils'
import { GetterTree, Getter, ActionTree, MutationTree, ModuleTree, Store, useStore as baseUseStore } from 'vuex'

// MOdules
import { cartModule } from './modules/cartModule'
import { favoriteModule } from './modules/favoriteModule'

const state: AppState = {
  isLoad: false,

  viewportCategory: 'large',
  language: Locales.enUs,
  theme: Theme.default,

  error: null,
}

const getters: GetterTree<AppState, any> = {}

const mutations: MutationTree<AppState> = {
  appInit: (state) => {
    state.isLoad = true
  },
  setLanguage: (state, payload: Locales) => {
    state.language = payload
  },
  setTheme: (state, payload: Theme) => {
    state.theme = payload
  },
  setViewportCategory: (state, payload: ViewportCategory) => {
    state.viewportCategory = payload
  },
}

const actions: ActionTree<AppState, any> = {
  async initApp({ state, commit }) {
    try {
      const theme = browserStorage.getItem('theme') || Theme.default
      const language = browserStorage.getItem('language') || Locales.enUs

      /**
       *  Need to store IDs in the browserStorage,
       *  and here receive product with api
       *  but such api not exist
       **/
      const cart = browserStorage.getItem('cart')
      const favorite = browserStorage.getItem('favorite')
      if (cart) commit('cart/loadStoroge', cart)
      if (favorite) commit('favorite/loadStoroge', favorite)

      document.documentElement.setAttribute('data-theme', theme)

      const validateSize = (scale: number) => {
        if (scale <= ViewportCategorySize.small) commit('setViewportCategory', 'small')
        else if (scale <= ViewportCategorySize.medium) commit('setViewportCategory', 'medium')
        else if (scale <= ViewportCategorySize.large) commit('setViewportCategory', 'large')
        console.log('scale', scale)
      }
      const dFunc = debounce<typeof validateSize>(validateSize, 150)
      window.addEventListener('resize', (event: any) => {
        dFunc(event.currentTarget.innerWidth)
      })

      commit('setTheme', theme)
      commit('setLanguage', language)
    } catch (e) {
      console.log(e, 'appInitError')
    } finally {
      commit('appInit')
    }
  },

  async changeLanguage({ state, commit }, language: Locales) {
    try {
      browserStorage.setItem('language', language)

      commit('setLanguage', language)
    } catch (e) {
      console.log(e, 'setLanguageError')
    }
  },

  async changeTheme({ state, commit }, theme: Theme) {
    try {
      document.documentElement.setAttribute('data-theme', theme)
      browserStorage.setItem('theme', theme)

      commit('setTheme', theme)
    } catch (e) {
      console.log(e, 'changeThemeError')
    }
  },
}

const modules: ModuleTree<any> = {
  cart: cartModule,
  favorite: favoriteModule,
  // <name>: <module>
}

export default new Store({
  state,
  actions,
  getters,
  mutations,
  modules,
})

// Custom hook
export function useStore(): Store<AppState> {
  return baseUseStore()
}
