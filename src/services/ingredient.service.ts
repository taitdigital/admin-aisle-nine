import ApiService from './api.service'

class IngredientService extends ApiService {
  constructor() {
    super('ingredients');
  }
}

export default new IngredientService()