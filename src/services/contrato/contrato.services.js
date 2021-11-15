import WebClient from '../api'

export const criarContrato = (contrato, onSuccess, onError) => {
    WebClient.post('/contratos', contrato, onSuccess, onError)
}