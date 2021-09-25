import axios from "axios";

const api = axios.create({
    baseURL: 'http://172.18.0.1:8080/ovigia',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        responseType: "text",
    },

})

//solicitacao
api.interceptors.request.use(function (config) {
    // Faça algo antes que a solicitação seja enviada

    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2aW5pY2l1c0BnbWFpbC5jb20iLCJpYXQiOjE2MzI1MjY2MzEsImV4cCI6MTYzMjU2OTgzMX0.QsUQ-nt-S5Ek_OYA_cdnPu60o7K8Gor3WpIWzRZY5y1ReY-tbl98go3ciWpwJWLT0DxnqoqBkilRG7TnLNioMQ'


    console.info('use header token: ' + token)
    config.headers.Authorization = `Bearer ${token}`

    return config

}, function (error) {
    console.error('fail on using header token: ' + error)
    return Promise.reject(error)
})

//resposta
api.interceptors.response.use(function (response) {
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


export default api

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

export function updateToken(token) {
   // api.interceptors.request.use(config => config.headers['Authorization'] = `Bearer ${token}`)
}

function handleError(error, onError) {
    if (onError !== undefined) {
        onError(error)
    }
    console.error(error)
    console.trace()
}