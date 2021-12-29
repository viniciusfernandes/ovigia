import WebClient from '../api'

export const obterVigiasProximos = (localizacao, onSuccess, onError) => {
    WebClient.get(`/vigias/localizacoes/proximos?latitude=${localizacao.latitude}&longitude=${localizacao.longitude}`, onSuccess, onError)
}

export const atualizarAvaliacaoVigia = (idVigia, valorAvaliacao, onSuccess, onError) => {
    const avaliacao = {
        valorAvaliacao: valorAvaliacao
    }
    WebClient.patch(`/vigias/${idVigia}/avaliacao`, avaliacao, onSuccess, onError)
}

