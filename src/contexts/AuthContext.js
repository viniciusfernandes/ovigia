import React, { createContext, useState } from 'react';
import { signIn, signOn } from '../services/auth/auth.service';

const AuthContext = createContext({})
export const AuthContextProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)

    const signin = usuario => signIn(
        usuario,
        data => {
            console.info('usuario logado: ' + data)
            setUsuario({ email: data.email, nome: data.nome, tipoUsario: data.tipoUsuario })
        },
        error => setUsuario(null)
    )


    const signon = usuario => signOn(
        usuario,
        data => {
            console.info('usuario criado: ' + data)
            setUsuario({ email: data.email, nome: data.nome, tipoUsario: data.tipoUsuario })
        },
        error => setUsuario(null)
    )

    return (
        <AuthContext.Provider value={{ signed: !!usuario, signIn: signin, signOn, signon }}    >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext