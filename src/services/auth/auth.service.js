import { GET, POST } from '../api'

export const signIn = (credencial) => {
    POST('/auth/signin', credencial, response => console.info('authentication: ' + response.data))
}