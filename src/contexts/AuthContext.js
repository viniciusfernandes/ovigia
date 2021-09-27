import React, { createContext, useState } from 'react';
import { updateToken } from '../services/api';
import { signIn, signOn } from '../services/auth/auth.service';
import { isVigia, TipoUsuario } from '../services/constantes'
const AuthContext = createContext({})

export const AuthContextProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)

    const habilitarHome = (usuario, navegarHome) => {
        setUsuario({
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome,
            tipoUsuario: usuario.tipoUsuario,
            signed: navegarHome
        })
    }

    const signin = credential => signIn(
        credential,
        usuario => habilitarHome(usuario, true),
        error => {
            setUsuario(null)
        }
    )

    const signon = (credential, onSuccess) => {
        credential.tipoUsuario = usuario.tipoUsuario
        signOn(
            credential,
            usuario => {
                habilitarHome(usuario, false)
                onSuccess()
            },
            error => setUsuario(null)
        )
    }

    return (
        <AuthContext.Provider value={{
            habilitarHome: () => habilitarHome(usuario, true),
            isVigia: !!usuario && isVigia(usuario.tipoUsuario),
            idUsuario: !!usuario ? usuario.id : null,
            nomeUsuario: !!usuario ? usuario.nome : null,
            setTipoUsuario: tipoUsuario => {
                if (!!usuario) {
                    setUsuario({ ...usuario, tipoUsuario: tipoUsuario })
                } else {
                    setUsuario({ tipoUsuario: tipoUsuario })
                }
            },
            signed: !!usuario && usuario.signed,
            autenticar: signin,
            cadastrar: signon,
            singOut: () => setUsuario(null),
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext