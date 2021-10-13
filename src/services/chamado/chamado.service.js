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