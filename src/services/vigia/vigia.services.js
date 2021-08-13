import { GET, POST } from '../api'

export const obterVigia = (idVigia, callback) => {
    GET(`/vigias/${idVigia}`, callback)
}

export const criarVigia = (vigia, callback) => {
    POST('/vigias', vigia, callback)
}