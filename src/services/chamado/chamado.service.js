import WebClient from '../api'

export const criarChamado = (chamado, callback) => {
    WebClient.post(`/clientes/${chamado.idCliente}/chamados`, {
        nomeCliente: chamado.nomeCliente,
        idVigia: chamado.idVigia,
        localizacao: chamado.localizacao
    }, callback)
}

export const obterChamadosAtivos = (idVigia, onSuccess) => {
    WebClient.get(`/vigias/${idVigia}/chamadosativos`, onSuccess)
}

export const aceitarChamado = (idChamado, onSuccess) => {
    WebClient.put(`/vigias/${idChamado}/chamados/aceite`, onSuccess)
}

export const cancelarChamado = (idChamado, onSuccess) => {
    WebClient.put(`/clientes/${idChamado}/chamados/cancelamento`, onSuccess)
}