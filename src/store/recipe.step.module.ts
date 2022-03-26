import RecipeStepService from '../services/step.service';

const recipeStepStorage = localStorage.getItem('recipeSteps');
const recipeSteps = (recipeStepStorage) ? JSON.parse(recipeStepStorage) : null;

const initialState = recipeSteps ? { recipeSteps } : { recipeSteps: [] };

export const recipeStepStore = {
  namespaced: true,
  state: initialState,
  actions: {
    index({ commit }, $recipe_id) {
      RecipeStepService.index($recipe_id).then(
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
    create({ commit }, {id, payload}) {
      return RecipeStepService.create(id, payload).then(
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
    edit({ commit }, {id, payload}) {
      return RecipeStepService.edit(id, payload).then(
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
      return RecipeStepService.delete(id).then(
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
    getRecipeStepsSuccess(state, steps) {
      state.recipeSteps = steps;
    },
    getRecipeStepsFailure(state) {
      state.recipeSteps = null;
    },
    createRecipeStepSuccess(state) {

    },
    createRecipeStepFailure(state) {

    },
    editRecipeStepSuccess(state) {

    },
    editRecipeStepFailure(state) {

    },
    deleteRecipeStepSuccess(state) {

    },
    deleteRecipeStepFailure(state) {

    }
  }
};