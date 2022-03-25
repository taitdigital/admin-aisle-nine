import RecipeService from '../services/recipe.service';

const recipeIngredientsStorage = localStorage.getItem('recipeIngredients');
const recipeIngredients = (recipeIngredientsStorage) ? JSON.parse(recipeIngredientsStorage) : null;

const initialState = recipeIngredients ? { recipeIngredients } : { recipeIngredients: [] };

export const recipeIngredientStore = {
  namespaced: true,
  state: initialState,
  actions: {
    index({ commit }) {
      RecipeService.index().then(
        recipes => {
          commit('getRecipeIngredientsSuccess', recipes);
          return Promise.resolve(recipes);
        },
        error => {
          commit('getRecipeIngredientsFailure');
          return Promise.reject(error);
        }
      );
    },
    create({ commit }, payload) {
      return RecipeService.create(payload).then(
        recipe => {
          commit('createRecipeIngredientSuccess', recipe);
          return Promise.resolve(recipe);
        },
        error => {
          commit('createRecipeIngredientFailure');
          return Promise.reject(error);
        }
      );
    },
    edit({ commit }, id, payload) {
      return RecipeService.edit(id, payload).then(
        recipe => {
          commit('editRecipeIngredientSuccess', recipe);
          return Promise.resolve(recipe);
        },
        error => {
          commit('editRecipeIngredientFailure');
          return Promise.reject(error);
        }
      );
    },
    delete({ commit }, id) {
      return RecipeService.delete(id).then(
        response => {
          commit('deleteRecipeIngredientSuccess', response);
          return Promise.resolve(response);
        },
        error => {
          commit('deleteRecipeIngredientFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    getRecipeIngredientsSuccess(state, recipes) {
      state.recipeIngredients = recipeIngredients;
    },
    getRecipeIngredientsFailure(state) {
      state.recipeIngredients = null;
    },
    createRecipeIngredientsSuccess(state) {

    },
    createRecipeIngredientsFailure(state) {

    },
    editRecipeIngredientsSuccess(state) {

    },
    editRecipeIngredientsFailure(state) {

    },
    deleteRecipeIngredientsSuccess(state) {

    },
    deleteRecipeIngredientsFailure(state) {

    }
  }
};