import React, { createContext, useState } from 'react';
import { signIn } from '../services/auth/auth.service';

const AuthContext = createContext({})
export const AuthContextProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)
    const authenticate = () => signIn(
        { email: "sss@hotmail.com", password: "1234" },
        data => {
            console.info('usuario logado: ' + data)
            setUsuario({ email: "vinicius@hotmail.com", nome: "Vinicius Fernandes" })
        },
        error => setUsuario(null)
    )
    return (
        <AuthContext.Provider value={{ signed: !!usuario, signIn: authenticate }}    >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext