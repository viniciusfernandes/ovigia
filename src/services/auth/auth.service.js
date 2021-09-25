import { POST, updateToken } from '../api'

export const signIn = (credencial, onSuccess) => {
    POST('/auth/signin', credencial, usuario => {
        console.info('singIn ok: ' + JSON.stringify(usuario))
        updateToken(usuario.token)
        onSuccess(usuario)
    })
}

export const signOn = (credencial, onSuccess) => {
    POST('/auth/signon', credencial, usuario => {
        console.info('singOn ok: ' + JSON.stringify(usuario))
        updateToken(usuario.token)
        onSuccess(usuario)
    })
}