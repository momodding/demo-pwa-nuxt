export const state = () => ({
  limitedStock: {}
})

export const mutations = {
  SET_LIMITED_STOCK(state, payload) {
    state.limitedStock = payload
  }
}

export const actions = {
  setLimitedStock({ commit, dispatch }, payload) {
    commit('SET_LIMITED_STOCK', payload)

    if (Object.keys(payload).length > 0) {
      const notification = {
        type: 'error',
        pesan: 'Limited stock !!'
      }

      dispatch('notification/addNotification', notification, { root: true })
    }
  }
}
