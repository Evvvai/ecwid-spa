import { Product } from '@/types'
import { browserStorage } from '@/utils'
import { GetterTree, ActionTree, MutationTree, Store, useStore as baseUseStore } from 'vuex'

interface CartState {
  cart: Product[]
}

const state: CartState = { cart: [] }

const mutations: MutationTree<CartState> = {
  loadStoroge: (state, payload: Product[]) => {
    state.cart = payload
  },
  added: (state, payload: Product[]) => {
    state.cart = payload
  },
  removed: (state, payload: Product[]) => {
    state.cart = payload
  },
  cleared: (state) => {
    state.cart = []
  },
}

const getters: GetterTree<CartState, any> = {}

const actions: ActionTree<CartState, any> = {
  async add({ state, commit }, payload: Product) {
    try {
      const cart = [...state.cart, payload]
      browserStorage.setItem('cart', cart)
      commit('added', cart)
    } catch (e) {
      console.log(e, 'addedError')
    }
  },

  async remove({ state, commit }, payload: Product) {
    try {
      const cart = (state.cart = state.cart.filter((x) => x.id !== payload.id))
      browserStorage.setItem('cart', [])
      commit('removed', cart)
    } catch (e) {
      console.log(e, 'removedError')
    }
  },

  async clear({ state, commit }) {
    try {
      browserStorage.removeItem('cart')
      commit('cleared')
    } catch (e) {
      console.log(e, 'removedError')
    }
  },
}

export const cartModule = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
}

// Custom hook
export function useCart(): Store<CartState> {
  return baseUseStore()
}
