import { createStore } from 'vuex'
import { auth } from './auth.module'
import { categoryStore } from './category.module'
import { ingredientStore } from './ingredient.module' 
import { recipeStore } from './recipe.module' 
import { recipeIngredientStore } from './recipe.ingredient.module' 
import { recipeStepStore } from './recipe.step.module'
import { userStore } from './user.module' 


const store = createStore({
  modules: {
    auth: auth,
    users: userStore,
    categories: categoryStore,
    ingredients: ingredientStore,
    recipes: recipeStore,
    recipeIngredients: recipeIngredientStore,
    recipeSteps: recipeStepStore
  }
})

export default store