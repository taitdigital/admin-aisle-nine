export const API_URL = 'http://localhost:8000/api';
export const IMG_URL = 'http://localhost:8000/uploaded_files';

export const getApiToken = () => {
    const user = localStorage.getItem('user');
    return (user) ? JSON.parse(user).token : null;
}
