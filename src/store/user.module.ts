import UserService from '../services/user.service'

const userStorage = localStorage.getItem('users')
const users = (userStorage) ? JSON.parse(userStorage) : null

const initialState = users ? { users } : { users: [] }

export const userStore = {
  namespaced: true,
  state: initialState,
  actions: {
    index({ commit }) {
      UserService.index().then(
        users => {
          commit('getUsersSuccess', users)
          return Promise.resolve(users)
        },
        error => {
          commit('getUsersFailure')
          return Promise.reject(error)
        }
      )
    },
    search({ commit }, searchTerm) {
      return UserService.search(searchTerm).then(
        ingredients => {
          commit('getUsersSuccess', ingredients)
          return Promise.resolve(ingredients)
        },
        error => {
          commit('getUsersFailure')
          return Promise.reject(error)
        }
      )
    },
    show({ commit }, id) {
      return UserService.show(id).then(
        recipe => {
          commit('showUserSuccess', recipe)
          return Promise.resolve(recipe)
        },
        error => {
          commit('showUserFailure')
          return Promise.reject(error)
        }
      )
    },
    create({ commit }, payload) {
      return UserService.create(payload).then(
        recipe => {
          commit('createUserSuccess', recipe)
          return Promise.resolve(recipe)
        },
        error => {
          commit('createUserFailure')
          return Promise.reject(error)
        }
      )
    },
    edit({ commit }, {id, payload}) {
      return UserService.edit(id, payload).then(
        recipe => {
          commit('editUserSuccess', recipe)
          return Promise.resolve(recipe)
        },
        error => {
          commit('editUserFailure')
          return Promise.reject(error)
        }
      )
    },
    delete({ commit }, id) {
      return UserService.delete(id).then(
        response => {
          commit('deleteUserSuccess', response)
          return Promise.resolve(response)
        },
        error => {
          commit('deleteUserFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    getUsersSuccess(state, users) {
      state.users = users
    },
    getUsersFailure(state) {
      state.users = null
    },
    showUserSuccess(state) {

    },
    showUserFailure(state) {

    },
    createUserSuccess(state) {

    },
    createUserFailure(state) {

    },
    editUserSuccess(state) {

    },
    editUserFailure(state) {

    },
    deleteUserSuccess(state) {

    },
    deleteUserFailure(state) {

    }
  }
}