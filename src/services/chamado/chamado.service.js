import WebClient from '../api'

export const criarChamado = (chamado, onSuccess) => {
    WebClient.post(`/clientes/${chamado.idCliente}/chamados`, chamado, onSuccess)
}

export const obterChamadosAtivosVigia = (idVigia, onSuccess) => {
    WebClient.get(`/vigias/${idVigia}/chamados-ativos`, onSuccess)
}

export const obterChamadoAtivoCliente = (idCliente, onSuccess) => {
    WebClient.get(`/clientes/${idCliente}/chamados/ativos`, onSuccess)
}

export const aceitarChamado = (idChamado, onSuccess) => {
    WebClient.put(`/vigias/${idChamado}/chamados/aceite`, undefined, onSuccess)
}

export const cancelarChamado = (idChamado, onSuccess) => {
    WebClient.put(`/clientes/${idChamado}/chamados/cancelamento`, undefined, onSuccess)
}