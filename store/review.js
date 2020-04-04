export const state = () => ({
  reviews: []
})

export const mutations = {
  SET_REVIEWS(state, payload) {
    state.reviews = payload
  },
  ADD_REVIEW(state, payload) {
    state.reviews.push(payload)

    if (process.client) {
      localStorage.setItem('reviews', JSON.stringify(state.reviews))
    }
  }
}

export const actions = {
  setReviews({ commit }, payload) {
    commit('SET_REVIEWS', payload)
  },

  addReview({ commit }, payload) {
    commit('ADD_REVIEW', payload)
  }
}
