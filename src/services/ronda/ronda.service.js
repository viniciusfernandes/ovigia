import WebClient from '../api'

export const criarRonda = (ronda, callback) => {
    WebClient.post(`/vigias/${ronda.idVigia}/rondas`, ronda, callback)
}

export const obterResumoRonda = (idVigia, onSuccess, onError) => {
    WebClient.get(`/vigias/${idVigia}/rondas/resumo`, onSuccess, onError)
}

export const obterFrequenciaRonda = (idCliente, onSuccess, onError) => {
    WebClient.get(`/clientes/${idCliente}/frequencia-ronda`, onSuccess, onError)
}