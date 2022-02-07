import WebClient from '../api'

export const criarChamado = (chamado, onSuccess) => {
    WebClient.post(`/clientes/${chamado.idCliente}/chamados`, chamado, onSuccess)
}

export const obterChamadosAbertosVigia = (idVigia, onSuccess) => {
    WebClient.get(`/vigias/${idVigia}/chamados-abertos`, onSuccess)
}

export const obterChamadoAtivoCliente = (idCliente, onSuccess) => {
    WebClient.get(`/clientes/${idCliente}/chamados/ativos`, onSuccess)
}

export const aceitarChamado = (idChamado, onSuccess) => {
    WebClient.patch(`/vigias/chamados/${idChamado}/aceite`, undefined, onSuccess)
}

export const cancelarChamado = (idChamado, onSuccess) => {
    WebClient.patch(`/clientes/chamados/${idChamado}/cancelamento`, undefined, onSuccess)
}

export const encerrarChamado = (idChamado, onSuccess) => {
    WebClient.patch(`/clientes/chamados/${idChamado}/encerramento`, undefined, onSuccess)
}