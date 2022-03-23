import { createStore } from 'vuex'
import { auth } from './auth.module'
import { categoryStore } from './category.module'
import { ingredientStore } from './ingredient.module' 

const store = createStore({
  modules: {
    auth: auth,
    categories: categoryStore,
    ingredients: ingredientStore
  },
});

export default store;