const API_URL = 'http://localhost:8000/api';

class CategoryService {
  index() {
    const user = localStorage.getItem('user');
    const BEARER_TOKEN = (user) ? JSON.parse(user).token : null;

    return fetch(API_URL + '/categories', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + BEARER_TOKEN,
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
            localStorage.setItem('categories', JSON.stringify(data));
        }
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        return error;
      });

  }

  search(searchTerm) {
    const user = localStorage.getItem('user');
    const BEARER_TOKEN = (user) ? JSON.parse(user).token : null;

    return fetch(API_URL + '/categories/search', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + BEARER_TOKEN,
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
            localStorage.setItem('categories', JSON.stringify(data));
        }
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        return error;
      });

  }

  show(id: number) {
    const user = localStorage.getItem('user');
    const BEARER_TOKEN = (user) ? JSON.parse(user).token : null;

    return fetch(API_URL + '/categories/' + id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + BEARER_TOKEN,        },
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
    const user = localStorage.getItem('user');
    const BEARER_TOKEN = (user) ? JSON.parse(user).token : null;

    return fetch(API_URL + '/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + BEARER_TOKEN,
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
    const user = localStorage.getItem('user');
    const BEARER_TOKEN = (user) ? JSON.parse(user).token : null;

    return fetch(API_URL + '/categories/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + BEARER_TOKEN,
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
    const user = localStorage.getItem('user');
    const BEARER_TOKEN = (user) ? JSON.parse(user).token : null;

    return fetch(API_URL + '/categories/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + BEARER_TOKEN,
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

export default new CategoryService();