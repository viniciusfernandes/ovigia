import WebClient from '../api'
export const signIn = (credencial, onSuccess) => {
    WebClient.post('/auth/signin', credencial, usuario => {
        console.info('singIn ok: ' + JSON.stringify(usuario))
        WebClient.setToken(usuario.token)
        onSuccess(usuario)
    })
}

export const signOn = (credencial, onSuccess) => {
    WebClient.post('/auth/signon', credencial, usuario => {
        console.info('singOn ok: ' + JSON.stringify(usuario))
        WebClient.setToken(usuario.token)
        onSuccess(usuario)
    })
}