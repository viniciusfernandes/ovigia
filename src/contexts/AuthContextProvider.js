import React, { createContext, useState } from 'react';
import { signIn } from '../services/auth/auth.service';

const Context = createContext({})
export default ({ children }) => {
    const [usuario, setUsuario] = useState({})
    const authenticate = () => signIn(
        { email: "sss@hotmail.com", password: "1234" },
        data => setUsuario({ email: "sss@hotmail.com", nome: "Vinicius Fernandes" }),
        error => setUsuario({})
    )
    return (
        <Context.Provider value={{ signed: !!usuario, signIn: authenticate }}    >
            {children}
        </Context.Provider>
    )
}