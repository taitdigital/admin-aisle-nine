import { API_URL, getApiToken } from '../constants/index'

class RecipeStepService {
  index(recipeId) {
    return fetch(`${API_URL}/recipes/steps/${recipeId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getApiToken(),
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
            localStorage.setItem('steps', JSON.stringify(data));
        }
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        return error;
      });

  }

  show(recipeId, stepId: number) {
    return fetch(API_URL + '/recipes/'+ recipeId +'/steps/' + stepId, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getApiToken(),        
        },
      })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        return error;
      });

  }

  create(payload: any) {
    return fetch(API_URL + '/recipes/steps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getApiToken(),
        },
        body: JSON.stringify(payload),
      })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        return error;
      });

  }

  edit(id: number, payload: any) {
    return fetch(API_URL + '/recipes/steps/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getApiToken(),
        },
        body: JSON.stringify(payload),
      })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        return error;
      });

  }

  delete(id: number) {
    return fetch(API_URL + '/recipes/steps/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getApiToken(),
        },
        body: JSON.stringify({}),
      })
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        return error;
      });

  }

}

export default new RecipeStepService();