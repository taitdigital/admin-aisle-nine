import ApiService from './api.service'

class RecipeIngredientService extends ApiService {

  constructor() {
    super('recipes/recipe-ingredients');
  }
}

export default new RecipeIngredientService()