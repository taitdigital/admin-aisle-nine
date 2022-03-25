import RecipeService from '../services/recipe.service';

const recipeStepStorage = localStorage.getItem('recipeSteps');
const recipeSteps = (recipeStepStorage) ? JSON.parse(recipeStepStorage) : null;

const initialState = recipeSteps ? { recipeSteps } : { steps: [] };

export const recipeStepStore = {
  namespaced: true,
  state: initialState,
  actions: {
    index({ commit }) {
      RecipeService.index().then(
        recipes => {
          commit('getRecipeStepsSuccess', recipes);
          return Promise.resolve(recipes);
        },
        error => {
          commit('getRecipeStepsFailure');
          return Promise.reject(error);
        }
      );
    },
    create({ commit }, payload) {
      return RecipeService.create(payload).then(
        recipe => {
          commit('createRecipeStepSuccess', recipe);
          return Promise.resolve(recipe);
        },
        error => {
          commit('createRecipeStepFailure');
          return Promise.reject(error);
        }
      );
    },
    edit({ commit }, id, payload) {
      return RecipeService.edit(id, payload).then(
        recipe => {
          commit('editRecipeStepSuccess', recipe);
          return Promise.resolve(recipe);
        },
        error => {
          commit('editRecipeStepFailure');
          return Promise.reject(error);
        }
      );
    },
    delete({ commit }, id) {
      return RecipeService.delete(id).then(
        response => {
          commit('deleteRecipeStepSuccess', response);
          return Promise.resolve(response);
        },
        error => {
          commit('deleteRecipeStepFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    getRecipeStepsSuccess(state, recipes) {
      state.recipeSteps = recipes;
    },
    getRecipeStepsFailure(state) {
      state.recipeSteps = null;
    },
    createRecipeStepsSuccess(state) {

    },
    createRecipeStepsFailure(state) {

    },
    editRecipeStepsSuccess(state) {

    },
    editRecipeStepsFailure(state) {

    },
    deleteRecipeStepsSuccess(state) {

    },
    deleteRecipeStepsFailure(state) {

    }
  }
};