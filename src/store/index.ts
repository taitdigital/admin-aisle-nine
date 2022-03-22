import { createStore } from "vuex";
import { auth } from "./auth.module";
import { categoryStore } from "./category.module";

const store = createStore({
  modules: {
    auth: auth,
    categories: categoryStore
  },
});

export default store;