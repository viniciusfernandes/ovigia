import { GET, POST } from '../api'

export const signIn = (credencial, onSuccess) => {
    POST('/auth/signin', credencial, onSuccess)
}