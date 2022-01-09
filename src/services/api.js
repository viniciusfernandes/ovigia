import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://10.0.2.2:8080/ovigia',
    //baseURL: 'http://172.18.0.1:8080/ovigia',
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
    //console.log('resposta interceptada:', JSON.stringify(response))
    return response

}, function (error) {
    // Qualquer código de status que esteja fora do intervalo de 2xx faz com que esta função seja acionada
    // Faça algo com erro de resposta
    //console.error('erro interceptado:' + JSON.stringify(error))
    switch (error.status) {
        case 401:
            handle401();
            break;
        case 403:
            handle403();
            break;
        case 422:
            handle422(error);
            break;
        default:
            handleDefaultError(error);
            break;
    }

    function handleDefaultError(error) {
        console.log(
            `DEFAULT ERROR: ${error.status} : ${error.error}, message: ${error.message}`
        );
    }
    function handle422(error) {
        console.log(
            `DEFAULT ERROR: ${error.status} : ${error.error
            }, errors: ${listErrors(error.errors)}`
        );
    }
    function handle401() {
        console.log(
            `Usuario não autorizado: ${error.status} : ${error.error}, message: ${error.message}`
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
        onError()
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
        return resp.data.value

    }

    post(resource, body, onSuccess, onError) {
        axiosInstance.post(resource, body)
            .then(response => {
                onSuccess(response.data.value !== undefined ? response.data.value : {})
            })

            .catch(error => handleError(error, onError));
    }

    patch(resource, body, onSuccess, onError) {
        axiosInstance.patch(resource, body)
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
        axiosInstance.delete(resource)
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
