import WebClient from '../api'
const BATCH_SIZE = 2000
const clonarRonda = (ronda, localizacoes) => {
    return {
        idVigia: ronda.idVigia,
        localizacoes: localizacoes,
        inicio: ronda.inicio,
        fim: ronda.fim
    }
}
const gerarBatchsRonda = ronda => {
    const locals = ronda.localizacoes
    let rondas = []
    if (locals.length <= BATCH_SIZE) {
        rondas.push(ronda)
        return rondas
    }

    let localizacoes = []
    for (let i = 0; i < locals.length; i++) {
        localizacoes.push(locals[i])
        if (localizacoes.length == BATCH_SIZE) {
            let novaRonda = clonarRonda(ronda, localizacoes)
            rondas.push(novaRonda)
            localizacoes = []
        }
    }

    if (localizacoes.length > 0) {
        rondas.push(clonarRonda(ronda, localizacoes))
    }
    return rondas
}
export const criarRondaComBatch = (ronda, onSuccess, onError) => {
    const rondas = gerarBatchsRonda(ronda)
    const ULTIMO = rondas.length - 1
    let batchIdx = 0;
    alert('total de rondas: ' + rondas.length)
    function criarRondasEmBatch() {
        setTimeout(() => {
            WebClient.post(`/vigias/${ronda.idVigia}/rondas`, rondas[batchIdx],
                batchIdx == ULTIMO ? onSuccess : reponse => { },
                onError)
            batchIdx++;
            if (batchIdx < rondas.length) {
                criarRondasEmBatch();
            }
        }, 6000)
    }

    criarRondasEmBatch();
}

export const criarRonda = (ronda, onSuccess, onError) => {
    WebClient.post(`/vigias/${ronda.idVigia}/rondas`, ronda, onSuccess, onError)
}

export const obterResumoRonda = (idVigia, onSuccess, onError) => {
    WebClient.get(`/vigias/${idVigia}/resumo-ronda`, onSuccess, onError)
}

export const obterFrequenciaRonda = (idCliente, onSuccess, onError) => {
    WebClient.get(`/clientes/${idCliente}/frequencia-ronda`, onSuccess, onError)
}