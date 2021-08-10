import axios from "axios";

const api = axios.create({
    baseURL: 'http://172.18.0.1:8080/ovigia',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc3NAaG90bWFpbC5jb20iLCJpYXQiOjE2MjgxMTIwNTIsImV4cCI6MTYyODE1NTI1Mn0.Egz07eNIiTynuIlmWqZxU5DIyr_vHAi4-Le_4dRc8q3PN5iSTxn07u3H72I6NGFewisR9PWQzK4Iu-lgsfS-xw'
    }
})

export function GET(resource, onGet, onError) {
    api.get(resource)
        .then(response => {
            onGet(response.data.value !== undefined ? response.data.value : {})
        })
        .catch(error => handleError(error, onError));
}

export function POST(resource, body, onPost, onError) {
    api.post(resource, body)
        .then(response => {
            onPost(response.data.value !== undefined ? response.data.value : {})
        })
        .catch(error => handleError(error, onError));
}

export function DELETE(resource, onDelete, onError) {
    api.delete(resource, body)
        .then(response => {
            onDelete(response.data.value !== undefined ? response.data.value : {})
        })
        .catch(error => handleError(error, onError));
}

function handleError(error, onError) {
    if (onError !== undefined) {
        onError(error)
    }
    console.error(error)
}