import EventService from '@/assets/js/EventService.js'

export const state = () => ({
  products: [],
  product: []
})

export const mutations = {
  SET_PRODUCTS(state, payload) {
    state.products = payload

    if (process.client) {
      localStorage.setItem('products', JSON.stringify(payload))
    }
  },
  SET_PRODUCT(state, payload) {
    state.product = payload
  }
}

export const actions = {
  fetchProducts({ commit }) {
    return EventService.getProducts().then((response) => {
      commit('SET_PRODUCTS', response.data)
    })
  },
  fetchProduct({ commit, getters }, slug) {
    const product = getters.getProductBySlug(slug)

    if (product) {
      commit('SET_PRODUCT', product)
    } else {
      return EventService.getProduct(slug).then((response) => {
        commit('SET_PRODUCT', response.data)
      })
    }
  }
}

export const getters = {
  getProductBySlug: () => (slug) => {
    let products = []

    if (process.client) {
      if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'))
      }
      return products.find((product) => product.id === slug)
    }
  }
}
