import WebClient from '../api'

const formatarData = () => {
    let data = new Date()
    return data.getDay() + '-' + data.getMonth() + '-' + data.getFullYear();
}

export const criarRonda = (ronda, callback) => {
    WebClient.post(`/vigias/${ronda.idVigia}/rondas`, ronda, callback)
}

export const obterResumoRonda = (idVigia, onSuccess, onError) => {
    WebClient.get(`/vigias/${idVigia}/rondas/resumo`, onSuccess, onError)
}