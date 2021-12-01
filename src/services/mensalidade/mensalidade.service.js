import WebClient from '../api'


export const obterMensalidadesVencidas = (idVigia, onSuccess, onError) => {
    WebClient.get(`/vigias/${idVigia}/mensalidades-vencidas`, onSuccess, onError)
}

export const pagarMensalidade = (idMensalidade, onSuccess, onError) => {
    WebClient.patch(`/mensalidades/${idMensalidade}/pagamento`, null, onSuccess, onError)
}
