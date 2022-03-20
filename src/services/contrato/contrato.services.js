import WebClient from '../api'

export const criarContrato = (contrato, onSuccess, onError) => {
    console.info(JSON.stringify(contrato))
    WebClient.post('/contratos', contrato, onSuccess, onError)
}

export const cancelarContrato = (idContrato, onSuccess, onError) => {
    WebClient.delete(`/contratos/${idContrato}`, onSuccess, onError)
}

export const obterContratoAtivoCliente = (idCliente, onSuccess, onError) => {
    WebClient.get(`/clientes/${idCliente}/contrato-ativo`, onSuccess, onError)
}

export const obterContratosAtivosVigia = (idVigia, onSuccess, onError) => {
    WebClient.get(`/vigias/${idVigia}/contratos-ativos`, onSuccess, onError)
}