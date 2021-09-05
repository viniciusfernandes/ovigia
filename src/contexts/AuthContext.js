import React, { createContext, useState } from 'react';
import { signIn, signOn } from '../services/auth/auth.service';

const AuthContext = createContext({})

export const AuthContextProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)
    const habilitarHome = (usuario, navegarHome) => setUsuario({ ...usuario, signed: navegarHome })

    const signin = usuario => signIn(
        usuario,
        data => {
            console.info('usuario logado: ' + data)
            habilitarHome({ email: data.email, nome: data.nome, tipoUsario: data.tipoUsuario }, true)
        },
        error => {
            setUsuario(null)
        }
    )

    const signon = (usuario, onSuccess) => signOn(
        usuario,
        data => {
            console.info('usuario criado: ' + JSON.stringify(data))
            setUsuario()
            habilitarHome({ email: data.email, nome: data.nome, tipoUsario: data.tipoUsuario }, false)
            onSuccess()
        },
        error => setUsuario(null)
    )
    return (
        <AuthContext.Provider value={{
            signed: !!usuario && usuario.signed,
            signIn: signin,
            signOn: signon,
            setTipoUsuario: tipoUsuario => setUsuario({ ...usuario, tipoUsuario }),
            habilitarHome: () => habilitarHome(usuario, true),
            nomeUsuario: !!usuario ? usuario.nome : null
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext