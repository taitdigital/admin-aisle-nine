const API_URL = 'http://localhost:8000/api'

class UploadService {
  upload(payload: any) {
    const user = localStorage.getItem('user')
    const BEARER_TOKEN = (user) ? JSON.parse(user).token : null
    const fd = new FormData()

    fd.append("entity_id", payload.entity_id)
    fd.append("entity_type", payload.entity_type)
    fd.append("file", payload.file)

    return fetch(API_URL + '/upload', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + BEARER_TOKEN,
        },
        body: fd,
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
            localStorage.setItem('user', JSON.stringify(data))
        }

        return data
      })
      .catch((error) => {
        console.error('Error:', error)
        return error
      })

  }
}

export default UploadService