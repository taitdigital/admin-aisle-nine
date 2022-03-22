import RecipeService from '../services/recipe.service';

const recipeStorage = localStorage.getItem('recipes');
const recipes = (recipeStorage) ? JSON.parse(recipeStorage) : null;

const initialState = recipes ? { recipes } : { recipes: [] };

export const recipeStore = {
  namespaced: true,
  state: initialState,
  actions: {
    index({ commit }) {
      RecipeService.index().then(
        recipes => {
          commit('getRecipesSuccess', recipes);
          return Promise.resolve(recipes);
        },
        error => {
          commit('getRecipesFailure');
          return Promise.reject(error);
        }
      );
    },
    show({ commit }, id) {
      RecipeService.show(id).then(
        recipe => {
          commit('showRecipeSuccess', recipe);
          return Promise.resolve(recipe);
        },
        error => {
          commit('showRecipeFailure');
          return Promise.reject(error);
        }
      );
    },
    create({ commit }, payload) {
      RecipeService.create(payload).then(
        recipe => {
          commit('createRecipeSuccess', recipe);
          return Promise.resolve(recipe);
        },
        error => {
          commit('createRecipeFailure');
          return Promise.reject(error);
        }
      );
    },
    edit({ commit }, id, payload) {
      RecipeService.edit(id, payload).then(
        recipe => {
          commit('editRecipeSuccess', recipe);
          return Promise.resolve(recipe);
        },
        error => {
          commit('editRecipeFailure');
          return Promise.reject(error);
        }
      );
    },
    delete({ commit }, id) {
      RecipeService.delete(id).then(
        response => {
          commit('deleteRecipeSuccess', response);
          return Promise.resolve(response);
        },
        error => {
          commit('deleteRecipeFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    getRecipesSuccess(state, recipes) {
      state.recipes = recipes;
    },
    getRecipesFailure(state) {
      state.recipes = null;
    },
    showRecipeSuccess(state) {

    },
    showRecipeFailure(state) {

    },
    createRecipeSuccess(state) {

    },
    createRecipeFailure(state) {

    },
    editRecipeSuccess(state) {

    },
    editRecipeFailure(state) {

    },
    deleteRecipeSuccess(state) {

    },
    deleteRecipeFailure(state) {

    }
  }
};