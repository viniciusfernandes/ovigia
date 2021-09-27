import React from "react";
const TipoUsuario = {
    VIGIA: 'VIGIA',
    CLIENTE: 'CLIENTE'
}

export function isVigia(tipoUsuario) {
    return TipoUsuario.VIGIA === tipoUsuario
}

export default TipoUsuario;