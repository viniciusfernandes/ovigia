import { GET, POST } from '../api'

export const criarVigia = (vigia, onSuccess) => {
    POST('/vigias', vigia, onSuccess)
}