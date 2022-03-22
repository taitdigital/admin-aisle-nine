const API_URL = 'http://localhost:8000/api';

class AuthService {
  login(user: any) {

    return fetch(API_URL + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
            localStorage.setItem('user', JSON.stringify(data));
        }

        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        return error;
      });

  }

  logout() {
    const user = localStorage.getItem('user');
    const BEARER_TOKEN = (user) ? JSON.parse(user).token : null;

    return fetch(API_URL + '/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + BEARER_TOKEN,
        },
        body: JSON.stringify({}),
      })
      .then(response => response.json())
      .then(data => {
        localStorage.removeItem('user');
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
        return error;
      });

  }

}

export default new AuthService();