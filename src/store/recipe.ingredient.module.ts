import RecipeIngredientService from '../services/recipe.ingredient.service'

const recipeIngredientsStorage = localStorage.getItem('recipeIngredients')
const recipeIngredients = (recipeIngredientsStorage) ? JSON.parse(recipeIngredientsStorage) : null

const initialState = recipeIngredients ? { recipeIngredients } : { recipeIngredients: [] }

export const recipeIngredientStore = {
  namespaced: true,
  state: initialState,
  actions: {
    index({ commit }, recipe_id) {
      RecipeIngredientService.index(recipe_id).then(
        recipes => {
          commit('getRecipeIngredientsSuccess', recipes)
          return Promise.resolve(recipes)
        },
        error => {
          commit('getRecipeIngredientsFailure')
          return Promise.reject(error)
        }
      )
    },
    create({ commit }, payload) {
      return RecipeIngredientService.create(payload).then(
        recipe => {
          commit('createRecipeIngredientSuccess', recipe)
          return Promise.resolve(recipe)
        },
        error => {
          commit('createRecipeIngredientFailure')
          return Promise.reject(error)
        }
      )
    },
    edit({ commit }, {id, payload}) {
      return RecipeIngredientService.edit(id, payload).then(
        recipe => {
          commit('editRecipeIngredientSuccess', recipe)
          return Promise.resolve(recipe)
        },
        error => {
          commit('editRecipeIngredientFailure')
          return Promise.reject(error)
        }
      )
    },
    delete({ commit }, id) {
      return RecipeIngredientService.delete(id).then(
        response => {
          commit('deleteRecipeIngredientSuccess', response)
          return Promise.resolve(response)
        },
        error => {
          commit('deleteRecipeIngredientFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    getRecipeIngredientsSuccess(state, recipeIngredients) {
      state.recipeIngredients = recipeIngredients
    },
    getRecipeIngredientsFailure(state) {
      state.recipeIngredients = null
    },
    createRecipeIngredientSuccess(state) {

    },
    createRecipeIngredientFailure(state) {

    },
    editRecipeIngredientSuccess(state) {

    },
    editRecipeIngredientFailure(state) {

    },
    deleteRecipeIngredientSuccess(state, recipeIngredients) {
      state.recipeIngredients = recipeIngredients
    },
    deleteRecipeIngredientFailure(state) {

    }
  }
}