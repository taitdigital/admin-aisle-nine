import ApiService from './api.service'

class RecipeService extends ApiService {
  constructor() {
    super('recipes');
  }
}

export default new RecipeService()