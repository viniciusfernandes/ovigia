import axios from "axios";

const api = axios.create({
    baseURL: 'http://172.18.0.1:8080/ovigia',
    // headers: {
    //     Authorization: 'Bearer TEMP-TO-CHANGE'
    // }
})

export function GET(resource, onSuccess, onError) {
    api.get(resource)
        .then(response => {
            onSuccess(response.data.value !== undefined ? response.data.value : {})
        })
        .catch(error => handleError(error, onError));
}

export function POST(resource, body, onSuccess, onError) {
    api.post(resource, body)
        .then(response => {
            onSuccess(response.data.value !== undefined ? response.data.value : {})
        })
        .catch(error => handleError(error, onError));
}

export function DELETE(resource, onSuccess, onError) {
    api.delete(resource, body)
        .then(response => {
            onSuccess(response.data.value !== undefined ? response.data.value : {})
        })
        .catch(error => handleError(error, onError));
}

export function updateToken(token){
    api.interceptors.request.use(config => config.headers['Authorization'] = `Bearer ${token}`)

}

function handleError(error, onError) {
    if (onError !== undefined) {
        onError(error)
    }
    console.error(error)
}