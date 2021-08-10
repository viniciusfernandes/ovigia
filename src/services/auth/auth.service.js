import { GET, POST } from '../api'

export const signIn = (credencial) => {
    POST('/auth/signin', credencial, data => console.info('authentication: ' + data))
}