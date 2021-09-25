import { POST } from '../api'

export const criarRonda = (idVigia, localizacoes, callback) => {
    POST(`/vigias/${idVigia}/localizacoes`,
        { data: new Date(), localizacoes: localizacoes },
        callback)
}