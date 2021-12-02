import WebClient from '../api'

export const criarSolicitacaoVisita = (solicitacao, onSuccess, onError) => {
    WebClient.post(`/solicitacoes-visitas/vigias/${solicitacao.idVigia}/clientes/${solicitacao.idCliente}`,
        {
            nomeCliente: solicitacao.nomeCliente,
            telefoneCliente: solicitacao.telefoneCliente,
            localizacaoCliente: solicitacao.localizacaoCliente
        },
        onSuccess,
        onError)
}

export const obterIdVigiaSolicitado = (idCliente, onSuccess, onError) => {
    WebClient.get(`/solicitacoes-visitas/clientes/${idCliente}/vigia-solicitado`, onSuccess, onError)
}

export const removerSolicitacaoVisita = (idCliente, onSuccess, onError) => {
    WebClient.delete(`/solicitacoes-visitas/clientes/${idCliente}`, onSuccess, onError)
}

export const obterSolicitacoesVisitas = (idvigia, onSuccess, onError) => {
    WebClient.get(`/solicitacoes-visitas/vigias/${idvigia}`, onSuccess, onError)
}

