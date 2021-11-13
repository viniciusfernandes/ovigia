import WebClient from '../api'

export const obterVigiasProximos = (localizacao, onSuccess, onError) => {
    WebClient.get(`/vigias/localizacoes/proximos?latitude=${localizacao.latitude}&longitude=${localizacao.longitude}`, onSuccess, onError)
}

export const criarSolicitacaoVisita = (solicitacao, onSuccess, onError) => {
    let solc = {
        nomecliente: solicitacao.nomecliente,
        telefoneCliente: solicitacao.telefoneCliente,
        localizacaoCliente: solicitacao.localizacaoCliente
    }
    WebClient.post(`/solicitacoes/vigias/${solicitacao.idVigia}/clientes/${solicitacao.idCliente}`, solc, onSuccess, onError)
}

export const obterSolicitacaoVisitaCliente = (idCliente, onSuccess, onError) => {
    WebClient.get(`/solicitacoes/clientes/${idCliente}/vigiasolicitado`, onSuccess, onError)
}

