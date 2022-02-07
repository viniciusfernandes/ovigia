
export const TipoUsuario = {
    VIGIA: 'VIGIA',
    CLIENTE: 'CLIENTE'
}

export const TipoSituacaoChamado = {
    ATIVO: 'ATIVO',
    ACEITO: 'ACEITO',
    ENCERRADO: 'ENCERRADO',
    isAtivo: situacao => situacao === 'ATIVO',
}

export function isVigia(tipoUsuario) {
    return TipoUsuario.VIGIA === tipoUsuario
}

export function isChamadoAtivo(chamado) {
    return TipoSituacaoChamado.ATIVO === chamado.situacao
}

export function isChamadoAceito(chamado) {
    return TipoSituacaoChamado.ACEITO === chamado.situacao
}

