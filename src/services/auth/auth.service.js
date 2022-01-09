import WebClient from '../api'
export const signIn = (credencial, onSuccess, onError) => {
    WebClient.post('/auth/signin', credencial,
        usuario => {
            WebClient.setToken(usuario.token)
            onSuccess(usuario)
        },
        onError
    )
}

export const signOn = (credential, onSuccess) => {
    WebClient.post('/auth/signon', credential, usuario => {
        WebClient.setToken(usuario.token)
        onSuccess(usuario)
    })
}