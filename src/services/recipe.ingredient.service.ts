import { API_URL, getApiToken } from '../constants/index'

class RecipeIngredientService {
  index(recipe_id) {
    return fetch(API_URL + '/recipes/ingredients/' + recipe_id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getApiToken(),
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
            localStorage.setItem('ingredients', JSON.stringify(data));
        }
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        return error;
      });

  }

  search(searchTerm) {
    return fetch(API_URL + '/recipes/ingredients/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getApiToken(),
        },
        body: JSON.stringify({ search: searchTerm })
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
            localStorage.setItem('ingredients', JSON.stringify(data));
        }
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        return error;
      });

  }

  show(id: number) {
    return fetch(API_URL + '/recipes/ingredients/' + id, {
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
    return fetch(API_URL + '/recipes/ingredients', {
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
    return fetch(API_URL + '/recipes/ingredients/' + id, {
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
    return fetch(API_URL + '/recipes/ingredients/' + id, {
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

export default new RecipeIngredientService();