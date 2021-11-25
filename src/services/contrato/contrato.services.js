import WebClient from '../api'

export const criarContrato = (contrato, onSuccess, onError) => {
    WebClient.post('/contratos', contrato, onSuccess, onError)
}


export const obterContratoAtivoCliente = (idCliente, onSuccess, onError) => {
    WebClient.get(`/clientes/${idCliente}/contrato-ativo`, onSuccess, onError)
}


export const obterContratosVencidos = (idVigia, onSuccess, onError) => {
    WebClient.get(`/vigias/${idVigia}/contratos-vencidos`, onSuccess, onError)
}