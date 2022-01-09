import Geolocation from '@react-native-community/geolocation';
import React, { createContext, useState } from 'react';
import { signIn, signOn } from '../services/auth/auth.service';
import { isVigia } from '../services/constantes'
const AuthContext = createContext({})

export const AuthContextProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)

    const habilitarHome = (usuario, navegarHome) => {
        setUsuario({
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome,
            telefone: usuario.telefone,
            tipoUsuario: usuario.tipoUsuario,
            signed: navegarHome,
            localizacao: usuario.localizacao,
        })
    }

    const signin = (credential, onError) => signIn(
        credential,
        usuario => habilitarHome(usuario, true),
        () => {
            setUsuario(null)
            onError()
        }
    )

    const signon = (credential, onSuccess) => {
        credential.tipoUsuario = usuario.tipoUsuario
        Geolocation.getCurrentPosition(
            position => {
                var coords = position.coords
                credential = {
                    ...credential,
                    localizacao: {
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        timestamp: new Date().getTime()
                    }
                }
                signOn(
                    credential,
                    usuario => {
                        habilitarHome(usuario, false)
                        onSuccess()
                    },
                    error => setUsuario(null)
                )

            },
            error => console.error(error.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
    }

    return (
        <AuthContext.Provider value={{
            habilitarHome: () => habilitarHome(usuario, true),
            isVigia: !!usuario && isVigia(usuario.tipoUsuario),
            idUsuario: !!usuario ? usuario.id : null,
            nomeUsuario: !!usuario ? usuario.nome : null,
            telefoneUsuario: !!usuario ? usuario.telefone : null,
            localizacao: !!usuario ? usuario.localizacao : null,
            setTipoUsuario: tipoUsuario => {
                if (!!usuario) {
                    setUsuario({ ...usuario, tipoUsuario: tipoUsuario })
                } else {
                    setUsuario({ tipoUsuario: tipoUsuario })
                }
            },
            signed: !!usuario && usuario.signed,
            signIn: signin,
            signOn: signon,
            singOut: () => setUsuario(null)
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext