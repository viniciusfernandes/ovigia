import WebClient from '../api'

export const criarRonda = (ronda, callback) => {
    WebClient.post(`/vigias/${ronda.idVigia}/rondas`, ronda, callback)
}