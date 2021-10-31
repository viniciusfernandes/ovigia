import axios from "axios";
import { useState } from "react/cjs/react.development";

export const axiosInstance = axios.create({
    baseURL: 'http://172.18.0.1:8080/ovigia',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        responseType: "text",
    },

})


//resposta
axiosInstance.interceptors.response.use(function (response) {
    // Qualquer código de status que esteja dentro do intervalo de 2xx faz com que esta função seja acionada
    // Faça algo com dados de resposta
    // console.log ('resposta interceptada:', response.data)
    return response

}, function (error) {
    // Qualquer código de status que esteja fora do intervalo de 2xx faz com que esta função seja acionada
    // Faça algo com erro de resposta
    console.error('resposta interceptada:' + error)

    let errorObj = error

    switch (errorObj.status) {
        case 401:
            handle401();
            break;
        case 403:
            handle403();
            break;
        case 422:
            handle422(errorObj);
            break;
        default:
            handleDefaultError(errorObj);
            break;
    }

    function handleDefaultError(errorObj) {
        console.log(
            `DEFAULT ERROR: ${errorObj.status} : ${errorObj.error}, message: ${errorObj.message}`
        );
    }
    function handle422(errorObj) {
        console.log(
            `DEFAULT ERROR: ${errorObj.status} : ${errorObj.error
            }, errors: ${listErrors(errorObj.errors)}`
        );
    }
    function handle401() {
        console.log(
            `ERROR: ${errorObj.status} : ${errorObj.error}, message: ${errorObj.message}`
        );
    }
    function handle403() {
        AlertMessage({
            title: "Atenção",
            message: "Sua sessão expirou.",
        });
    }

    function listErrors(messages) {
        let s = "";
        for (const iterator of messages) {
            s +=
                "fieldName : " +
                iterator.fieldName +
                ", message :" +
                iterator.message +
                "\n";
        }
        return s;
    }

    return Promise.reject(error)
})



export function updateToken(token) {
    setToken(token)
}

function handleError(error, onError) {
    if (onError !== undefined) {
        onError(error)
    }
    console.error(error)
    console.trace()

}



class WebClient {
    constructor() {
        this.token = null
    }

    get(resource, onSuccess, onError) {
        axiosInstance.get(resource)
            .then(response => {
                onSuccess(response.data.value !== undefined ? response.data.value : null)
            })
            .catch(error => handleError(error, onError));
    }

    async getSync(resource, onError) {
        var resp = await axiosInstance.get(resource).catch(error => handleError(error, onError))
        console.info('etapa 2. Total chamados: ' + JSON.stringify(resp.data.value[0]))
        return resp.data.value

    }

    post(resource, body, onSuccess, onError) {
        axiosInstance.post(resource, body)
            .then(response => {
                onSuccess(response.data.value !== undefined ? response.data.value : {})
            })

            .catch(error => handleError(error, onError));
    }

    put(resource, body, onSuccess, onError) {
        axiosInstance.put(resource, body)
            .then(response => {
                onSuccess(response.data.value !== undefined ? response.data.value : {})
            })
            .catch(error => handleError(error, onError));
    }

    delete(resource, onSuccess, onError) {
        axiosInstance.delete(resource, body)
            .then(response => {
                onSuccess(response.data.value !== undefined ? response.data.value : {})
            })
            .catch(error => handleError(error, onError));
    }

    setToken(token) {
        this.token = token
        axiosInstance.interceptors.request.use(function (config) {
            config.headers.Authorization = `Bearer ${token}`

            return config

        }, function (error) {
            console.error('fail on using header token: ' + error)
            return Promise.reject(error)
        })

    }

}

export default new WebClient()
