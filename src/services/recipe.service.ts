const API_URL = 'http://localhost:8000/api';

class RecipeService {
  index() {

    return fetch(API_URL + '/recipes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
            localStorage.setItem('recipes', JSON.stringify(data));
        }

        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        return error;
      });

  }

  show(id: number) {

    return fetch(API_URL + '/recipes/' + id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

    return fetch(API_URL + '/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

    return fetch(API_URL + '/recipes' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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

    return fetch(API_URL + '/recipes/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
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

export default new RecipeService();