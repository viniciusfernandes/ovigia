import WebClient from '../api'

export const criarSolicitacaoVisita = (solicitacao, onSuccess, onError) => {
    WebClient.post(`/solicitacoes/vigias/${solicitacao.idVigia}/clientes/${solicitacao.idCliente}`,
        {
            nomeCliente: solicitacao.nomeCliente,
            telefoneCliente: solicitacao.telefoneCliente,
            localizacaoCliente: solicitacao.localizacaoCliente
        },
        onSuccess,
        onError)
}

export const obterIdVigiaSolicitado = (idCliente, onSuccess, onError) => {
    WebClient.get(`/solicitacoes/clientes/${idCliente}/vigiasolicitado`, onSuccess, onError)
}

export const obterSolicitacoesVisitas = (idvigia, onSuccess, onError) => {
    WebClient.get(`/solicitacoes/vigias/${idvigia}`, onSuccess, onError)
}

