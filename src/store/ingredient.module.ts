import IngredientService from '../services/ingredient.service'

const ingredientStorage = localStorage.getItem('ingredients')
const ingredients = (ingredientStorage) ? JSON.parse(ingredientStorage) : null

const initialState = ingredients ? { ingredients } : { ingredients: [] }

export const ingredientStore = {
  namespaced: true,
  state: initialState,
  actions: {
    index({ commit }) {
      return IngredientService.index().then(
        ingredients => {
          commit('getIngredientsSuccess', ingredients)
          return Promise.resolve(ingredients)
        },
        error => {
          commit('getIngredientsFailure')
          return Promise.reject(error)
        }
      )
    },
    search({ commit }, searchTerm) {
      return IngredientService.search(searchTerm).then(
        ingredients => {
          commit('getIngredientsSuccess', ingredients)
          return Promise.resolve(ingredients)
        },
        error => {
          commit('getIngredientsFailure')
          return Promise.reject(error)
        }
      )
    },
    show({ commit }, id) {
      return IngredientService.show(id).then(
        ingredient => {
          commit('showIngredientSuccess', ingredient)
          return Promise.resolve(ingredient)
        },
        error => {
          commit('showIngredientFailure')
          return Promise.reject(error)
        }
      )
    },
    create({ commit }, payload) {
      return IngredientService.create(payload).then(
        ingredient => {
          commit('createIngredientSuccess', ingredient)
          return Promise.resolve(ingredient)
        },
        error => {
          commit('createIngredientFailure')
          return Promise.reject(error)
        }
      )
    },
    edit({ commit }, {id, payload}) {
      return IngredientService.edit(id, payload).then(
        ingredient => {
          commit('editIngredientSuccess', ingredient)
          return Promise.resolve(ingredient)
        },
        error => {
          commit('editIngredientFailure')
          return Promise.reject(error)
        }
      )
    },
    delete({ commit }, id) {
      return IngredientService.delete(id).then(
        response => {
          commit('deleteIngredientSuccess', response)
          return Promise.resolve(response)
        },
        error => {
          commit('deleteIngredientFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    getIngredientsSuccess(state, ingredients) {
      state.ingredients = ingredients
    },
    getIngredientsFailure(state) {
      state.ingredients = null
    },
    showIngredientsSuccess(state, ingredient) {

    },
    showIngredientFailure(state) {

    },
    createIngredientSuccess(state, ingredient) {

    },
    createIngredientFailure(state) {

    },
    editIngredientSuccess(state) {

    },
    editIngredientFailure(state) {

    },
    deleteIngredientSuccess(state) {

    },
    deleteIngredientFailure(state) {

    }
  }
}