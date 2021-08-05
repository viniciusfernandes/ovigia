import api from '../api'

export const obterVigia = (idVigia, callback) => {
    api.get(`/vigias/${idVigia}`)
        .then(response => {
            callback(response.data.value !== undefined ? response.data.value : {})
        })
        .catch(error => console.log(error));
}

export const criarVigia = (vigia, callback) => {
    api.post('/vigias', vigia)
        .then(response => callback(response.data.value))
        .catch(error => console.log(error));
}