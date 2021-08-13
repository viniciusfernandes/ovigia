import axios from "axios";

const api = axios.create({
    baseURL: 'http://172.18.0.1:8080/ovigia',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc3NAaG90bWFpbC5jb20iLCJpYXQiOjE2Mjg4MTg0OTcsImV4cCI6MTYyODg2MTY5N30.GdhqCKCv252Y_9mnionhOl8pfjNtLSMqEglV5Vnughs5DkPfEKY7BmPa820v3OXWSr7UWIbwhJyRL3gLyTwFwQ'
    }
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

function handleError(error, onError) {
    if (onError !== undefined) {
        onError(error)
    }
    console.error(error)
}