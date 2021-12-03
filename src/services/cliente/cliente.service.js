import WebClient from '../api'

export const obterIdVigiaCliente = (idCliente, onSuccess) => {
    WebClient.get(`/clientes/${idCliente}/id-vigia`, onSuccess)
}