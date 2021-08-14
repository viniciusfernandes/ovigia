import { POST, updateToken } from '../api'

export const signIn = (credencial, onSuccess) => {
    POST('/auth/signin', credencial, onSuccess)
}

export const signOn = (credencial, onSuccess) => {
    POST('/auth/signon', credencial, token => {
        console.info('singOn ok: ' + token)
        updateToken(token)
        onSuccess()
    })
}