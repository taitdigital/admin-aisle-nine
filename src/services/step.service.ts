import ApiService from './api.service'
import { API_URL } from '../constants/index'


class RecipeStepService extends ApiService {
  constructor() {
    super('recipes/recipe-steps');
  }

  // @ts-ignore: i dunno why ts doesn't like this overload
  index(recipeId) {
    return fetch(`${API_URL}/recipes/recipe-steps/${recipeId}`, {
        method: 'GET',
        headers: this.headers
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
            localStorage.setItem('steps', JSON.stringify(data))
        }
        return data
      })
      .catch((error) => {
        console.error('Error:', error)
        return error
      })

  }
}

export default new RecipeStepService()