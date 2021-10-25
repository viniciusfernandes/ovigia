
export const TipoUsuario = {
    VIGIA: 'VIGIA',
    CLIENTE: 'CLIENTE'
}

export const TipoSituacaoChamado = {
    ABERTO: 'ABERTO',
    ACEITO: 'ACEITO',
    ENCERRADO: 'ENCERRADO',
    isAberto: situacao => situacao === 'ABERTO',
}

export function isVigia(tipoUsuario) {
    return TipoUsuario.VIGIA === tipoUsuario
}

