import CategoryService from '../services/category.service'

const categoryStorage = localStorage.getItem('categories')
const categories = (categoryStorage) ? JSON.parse(categoryStorage) : null

const initialState = categories ? { categories } : { categories: [] }

export const categoryStore = {
  namespaced: true,
  state: initialState,
  actions: {
    index({ commit }) {
      return CategoryService.index().then(
        categories => {
          commit('getCategoriesSuccess', categories)
          return Promise.resolve(categories)
        },
        error => {
          commit('getCategoriesFailure')
          return Promise.reject(error)
        }
      )
    },
    search({ commit }, searchTerm) {
      return CategoryService.search(searchTerm).then(
        categories => {
          commit('getCategoriesSuccess', categories)
          return Promise.resolve(categories)
        },
        error => {
          commit('getCategoriesFailure')
          return Promise.reject(error)
        }
      )
    },
    show({ commit }, id) {
      return CategoryService.show(id).then(
        category => {
          commit('showCategorySuccess', category)
          return Promise.resolve(category)
        },
        error => {
          commit('showCategoryFailure')
          return Promise.reject(error)
        }
      )
    },
    create({ commit }, payload) {
      return CategoryService.create(payload).then(
        category => {
          commit('createCategorySuccess', category)
          return Promise.resolve(category)
        },
        error => {
          commit('createCategoryFailure')
          return Promise.reject(error)
        }
      )
    },
    edit({ commit }, {id, payload}) {
      return CategoryService.edit(id, payload).then(
        category => {
          commit('editCategorySuccess', category)
          return Promise.resolve(category)
        },
        error => {
          commit('editCategoryFailure')
          return Promise.reject(error)
        }
      )
    },
    delete({ commit }, id) {
      return CategoryService.delete(id).then(
        response => {
          commit('deleteCategorySuccess', response)
          return Promise.resolve(response)
        },
        error => {
          commit('deleteCategoryFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    getCategoriesSuccess(state, categories) {
      state.categories = categories
    },
    getCategoriesFailure(state) {
      state.categories = null
    },
    showCategoriesSuccess(state, category) {

    },
    showCategoryFailure(state) {

    },
    createCategorySuccess(state, category) {

    },
    createCategoryFailure(state) {

    },
    editCategorySuccess(state) {

    },
    editCategoryFailure(state) {

    },
    deleteCategorySuccess(state) {

    },
    deleteCategoryFailure(state) {

    }
  }
}