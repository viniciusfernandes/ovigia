import WebClient from '../api'

export const criarRonda = (idVigia, localizacoes, callback) => {
    WebClient.post(`/vigias/${idVigia}/localizacoes`,
        { data: new Date(), localizacoes: localizacoes },
        callback)
}