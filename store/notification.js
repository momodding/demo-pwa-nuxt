export const state = () => ({
  notifications: []
})

let nextId = 0

export const mutations = {
  ADD_NOTIFICATION(state, payload) {
    state.notifications.push({ ...payload, id: nextId++ })
  },
  REMOVE_NOTIFICATION(state, payload) {
    state.notifications = state.notifications.filter(
      (notifications) => notifications.id !== payload.id
    )
  }
}

export const actions = {
  addNotification({ commit }, payload) {
    commit('ADD_NOTIFICATION', payload)
  },
  removeNotification({ commit }, payload) {
    commit('REMOVE_NOTIFICATION', payload)
  }
}
