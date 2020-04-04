export const state = () => ({
  productsInCart: [],
  totalPrice: 0,
  totalProductsInCart: 0,
  productAddedToCart: []
})

function randomString() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
  const stringLength = 16
  let randomstring = ''
  for (let i = 0; i < stringLength; i++) {
    const rnum = Math.floor(Math.random() * chars.length)
    randomstring += chars.substring(rnum, rnum + 1)
  }
  return randomstring
}

export const mutations = {
  SET_PRODUCTS_IN_CART(state, payload) {
    state.productsInCart = payload
  },
  ADD_PRODUCT_TO_CART(state, payload) {
    state.totalPrice = 0
    state.productsInCart = []
    state.totalProductsInCart = 0

    if (localStorage.getItem('totalPrice')) {
      state.totalPrice = JSON.parse(localStorage.getItem('totalPrice'))
    }

    if (localStorage.getItem('productsInCart')) {
      state.productsInCart = JSON.parse(localStorage.getItem('productsInCart'))
    }

    if (localStorage.getItem('totalProductsInCart')) {
      state.totalProductsInCart = JSON.parse(
        localStorage.getItem('totalProductsInCart')
      )
    }

    state.totalPrice += payload.price
    state.productsInCart.push({ ...payload, uniqueId: randomString() })
    state.totalProductsInCart = state.productsInCart.length

    if (process.client) {
      localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice))
      localStorage.setItem(
        'productsInCart',
        JSON.stringify(state.productsInCart)
      )
      localStorage.setItem(
        'totalProductsInCart',
        JSON.stringify(state.totalProductsInCart)
      )
    }
  },
  REMOVE_PRODUCT_FROM_CART(state, payload) {
    state.productsInCart = []

    if (localStorage.getItem('productsInCart')) {
      state.productsInCart = JSON.parse(localStorage.getItem('productsInCart'))

      const uniqueId = payload.uniqueId

      state.totalPrice = 0

      state.productsInCart = state.productsInCart.filter(
        (productsInCart) => productsInCart.uniqueId !== uniqueId
      )

      for (let i = 0; i < state.productsInCart.length; i++) {
        state.totalPrice += state.productsInCart[i].price
      }

      state.totalProductsInCart = state.productsInCart.length

      if (process.client) {
        localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice))
        localStorage.setItem(
          'productsInCart',
          JSON.stringify(state.productsInCart)
        )
        localStorage.setItem(
          'totalProductsInCart',
          JSON.stringify(state.totalProductsInCart)
        )
      }
    }
  },
  SET_TOTAL_PRICE(state, totalPrice) {
    state.totalPrice = totalPrice
  },
  SET_TOTAL_PRODUCTS_IN_CART(state, totalProductsInCart) {
    state.totalProductsInCart = totalProductsInCart
  },
  SET_PRODUCT_ADDED_TO_CART(state, payload) {
    state.productAddedToCart = payload
  }
}

export const actions = {
  setProductsInCart({ commit }, payload) {
    commit('SET_PRODUCTS_IN_CART', payload)
  },

  addProductToCart({ commit }, payload) {
    commit('ADD_PRODUCT_TO_CART', payload)
  },

  removeProductFromCart({ commit }, payload) {
    commit('REMOVE_PRODUCT_FROM_CART', payload)
  },

  setTotalPrice({ commit }, totalPrice) {
    commit('SET_TOTAL_PRICE', totalPrice)
  },

  setTotalProductsInCart({ commit }, totalProductsInCart) {
    commit('SET_TOTAL_PRODUCTS_IN_CART', totalProductsInCart)
  },

  setProductAddedToCart({ commit }, payload) {
    commit('SET_PRODUCT_ADDED_TO_CART', payload)
  }
}
