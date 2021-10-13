import WebClient from '../api'

export const criarChamado = (idCliente, idVigia, callback) => {
    WebClient.post(`/clientes/${idCliente}/chamados`, { idVigia: idVigia }, callback)
}