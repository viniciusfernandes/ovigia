import WebClient from '../api'

export const obterVigiasProximos = (localizacao, onSuccess, onError) => {
    WebClient.get(`/vigias/localizacoes/proximos?latitude=${localizacao.latitude}&longitude=${localizacao.longitude}`, onSuccess, onError)
}
