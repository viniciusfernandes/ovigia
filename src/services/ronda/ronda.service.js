import WebClient from '../api'

export const criarRonda = (idVigia, localizacoes, callback) => {

    var tempLoc = []
    for (var i = 0; i < 1000; i++) {
        for (var j = 0; j < localizacoes.length; j++) {
            tempLoc.push(localizacoes[j])
        }

    }

    WebClient.post(`/vigias/${idVigia}/rondas`,
        { data: new Date(), localizacoes: tempLoc },
        callback)
}