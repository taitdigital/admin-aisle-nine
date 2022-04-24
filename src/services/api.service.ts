import { API_URL, getApiToken } from '../constants/index'

class ApiService {
    context = ''
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getApiToken(),
    }

    constructor(context: string = '') {
        if (!context) return
        this.context = context
    }

    index() {
        return fetch(`${API_URL}/${this.context}`, {
            method: 'GET',
            headers: this.headers
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                localStorage.setItem(this.context, JSON.stringify(data))
            }
            return data
        })
        .catch((error) => {
            console.error('Error:', error)
            return error
        })
    }

    search(searchTerm) {
        return fetch(`${API_URL}/${this.context}/search`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({ search: searchTerm })
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                localStorage.setItem(this.context, JSON.stringify(data))
            }
            return data
        })
        .catch((error) => {
            console.error('Error:', error)
            return error
        })
    }

    show(id: number) {
        return fetch(`${API_URL}/${this.context}/${id}`, {
            method: 'GET',
            headers: this.headers,
        })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch((error) => {
            console.error('Error:', error)
            return error
        })
    }

    create(payload: any) {
        return fetch(`${API_URL}/${this.context}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch((error) => {
            console.error('Error:', error)
            return error
        })
    }

    edit(id: number, payload: any) {
        return fetch(`${API_URL}/${this.context}/${id}`, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch((error) => {
            console.error('Error:', error)
            return error
        })
    }

    delete(id: number) {
        return fetch(`${API_URL}/${this.context}/${id}`, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify({}),
        })
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch((error) => {
            console.error('Error:', error)
            return error
        })

    }
}

export default ApiService