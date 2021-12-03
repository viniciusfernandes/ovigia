import WebClient from '../api'


export const obterMensalidadesVencidas = (idVigia, onSuccess, onError) => {
    WebClient.get(`/vigias/${idVigia}/mensalidades-vencidas`, onSuccess, onError)
}


export const obterValorRecebido = (idVigia, onSuccess, onError) => {
    WebClient.get(`/vigias/${idVigia}/valor-recebido`, onSuccess, onError)
}

export const pagarMensalidade = (pagamento, onSuccess, onError) => {
    WebClient.patch(`/mensalidades/${pagamento.idMensalidade}/pagamento`,
        {
            idVigia: pagamento.idVigia,
            valor: pagamento.valor
        },
        onSuccess, onError)
}
