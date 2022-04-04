export const API_URL = 'http://localhost:8000/api';
export const IMG_URL = 'http://localhost:8000/uploaded_files';

export const getApiToken = () => {
    const user = localStorage.getItem('user');
    return (user) ? JSON.parse(user).token : null;
}

export const treatment_options = [
    'whole',
    'crushed',
    'powdered',
    'muddled',
    'diced',
    'peeled',
    'sliced',
    'cooked',
    'melted',
    'boiled',
    'grated'
]

export const measurement_options = [
    'kg',
    'g',
    'mg',
    'l',
    'ml',
    'cup(s)',
    'rasher(s)',
    'tsp',
    'tbsp'
]