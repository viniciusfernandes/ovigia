import { POST, updateToken } from '../api'

export const signIn = (credencial, onSuccess) => {
    POST('/auth/signin', credencial, onSuccess)
}

export const signOn = (credencial, onSuccess) => {
    POST('/auth/signon', credencial, usuario => {
        console.info('singOn ok: ' + JSON.stringify(usuario))
        updateToken(usuario)
        onSuccess(usuario)
    })
}