import React, { createContext, useState } from 'react';
import { updateToken } from '../services/api';
import { signIn, signOn } from '../services/auth/auth.service';
import { TipoUsuario } from '../services/constantes'
const AuthContext = createContext({})

export const AuthContextProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)
    const habilitarHome = (usuario, navegarHome) => {
        setUsuario({
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome,
            tipoUsario: usuario.tipoUsuario,
            signed: navegarHome
        })
    }

    const signin = usuario => signIn(
        usuario,
        usuarioAutenticado => habilitarHome(usuarioAutenticado, true),
        error => {
            setUsuario(null)
        }
    )

    const signon = (usuario, onSuccess) => signOn(
        usuario,
        usuarioAutenticado => {
            setUsuario()
            habilitarHome(usuarioAutenticado, false)
            onSuccess()
        },
        error => setUsuario(null)
    )
    return (
        <AuthContext.Provider value={{
            signed: !!usuario && usuario.signed,
            idUsuario: !!usuario ? usuario.id : null,
            signIn: signin,
            signOn: signon,
            singOut: () => setUsuario(null),
            setTipoUsuario: tipoUsuario => setUsuario({ ...usuario, tipoUsuario }),
            isVigia: !!usuario ? TipoUsuario.isVigia(usuario.tipoUsario) : false,
            habilitarHome: () => habilitarHome(usuario, true),
            nomeUsuario: !!usuario ? usuario.nome : null
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext