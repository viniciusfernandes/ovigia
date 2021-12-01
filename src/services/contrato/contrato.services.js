import WebClient from '../api'

export const criarContrato = (contrato, onSuccess, onError) => {
    WebClient.post('/contratos', {
        idCliente: contrato.idCliente,
        nomeCliente: contrato.nomeCliente,
        telefoneCliente: contrato.telefoneCliente,
        idVigia: contrato.idVigia,
        valor: contrato.valor
    }, onSuccess, onError)
}

export const cancelarContrato = (idContrato, onSuccess, onError) => {
    WebClient.delete(`/contratos/${idContrato}`, onSuccess, onError)
}

export const obterContratoAtivoCliente = (idCliente, onSuccess, onError) => {
    WebClient.get(`/clientes/${idCliente}/contrato-ativo`, onSuccess, onError)
}