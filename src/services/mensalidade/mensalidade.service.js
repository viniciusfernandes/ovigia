import WebClient from '../api'


export const obterMensalidadesVencidas = (idVigia, onSuccess, onError) => {
    WebClient.get(`/vigias/${idVigia}/mensalidades-vencidas`, onSuccess, onError)
}
