import { Product } from '@/types'
import { browserStorage } from '@/utils'
import { GetterTree, ActionTree, MutationTree, Store, useStore as baseUseStore } from 'vuex'

interface FavoriteState {
  // favorite: any[]
  favorite: Product[]
}

const state: FavoriteState = { favorite: [] }

const mutations: MutationTree<FavoriteState> = {
  loadStoroge: (state, payload: Product[]) => {
    state.favorite = payload
  },
  added: (state, payload: Product[]) => {
    state.favorite = payload
  },
  removed: (state, payload: Product[]) => {
    state.favorite = payload
  },
}

const getters: GetterTree<FavoriteState, any> = {}

const actions: ActionTree<FavoriteState, any> = {
  async add({ state, commit }, payload: Product) {
    try {
      const favorite = [...state.favorite, payload]
      browserStorage.setItem('favorite', favorite)
      commit('added', favorite)
    } catch (e) {
      console.log(e, 'addedError')
    }
  },

  async remove({ state, commit }, payload: Product) {
    try {
      const favorite = (state.favorite = state.favorite.filter((x) => x.id !== payload.id))
      browserStorage.setItem('favorite', favorite)
      commit('removed', favorite)
    } catch (e) {
      console.log(e, 'removedError')
    }
  },
}

export const favoriteModule = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}

// Custom hook
export function useFavorite(): Store<FavoriteState> {
  return baseUseStore()
}
