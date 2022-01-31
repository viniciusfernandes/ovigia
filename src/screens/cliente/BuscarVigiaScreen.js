import { useFocusEffect } from "@react-navigation/core"
import React, { useContext, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import Container from "../../components/Container"
import HeaderBox from "../../components/HeaderBox"
import VigiaRatingBox from "../../components/VigiaRatingBox"
import AuthContext from "../../contexts/AuthContext"
import { criarSolicitacaoVisita, obterVigiaSolicitado, removerSolicitacaoVisita } from "../../services/solicitacaoVisita/solicitacao.visita.services"
import { obterVigiasProximos } from "../../services/vigia/vigia.services"

import matisse from "../../style/matisse"
const styles = StyleSheet.create({
    cancelarButton: {
        backgroundColor: matisse.laranjaAvermelhado
    },
    solicitarButton: {
        backgroundColor: matisse.laranja
    },
    button: {
        marginBottom: 10
    }
})
export default props => {
    const { idUsuario, nomeUsuario, telefoneUsuario, localizacao } = useContext(AuthContext)
    const [vigiaBoxes, setVigiaBoxes] = useState([])
    const gerarVigiaBox = (vigia, titulo, style, onPress) => {
        return <VigiaRatingBox key={vigia.id}
            style={styles.button}
            styleButton={style}
            icon={require('../../../images/usuario_branco_75.png')}
            vigia={vigia}
            buttonTitle={titulo}
            onPress={onPress}
            showMensalidade />
    }

    const gerarCancelamentoSolicitacaoVigiaBox = (vigia) => {
        return <VigiaRatingBox key={vigia.id}
            style={styles.button}
            styleButton={styles.cancelarButton}
            icon={require('../../../images/usuario_branco_75.png')}
            vigia={vigia}
            buttonTitle={'Cancelar Solicitação'}
            onPress={() => removerSolicitacaoVisita(idUsuario, () => obterVigias())}
            showMensalidade />
    }

    const gerarSolicitacao = vigia => {
        return {
            idCliente: idUsuario,
            nomeCliente: nomeUsuario,
            telefoneCliente: telefoneUsuario,
            idVigia: vigia.id,
            localizacaoCliente: localizacao
        }
    }

    const obterVigias = () => obterVigiaSolicitado(idUsuario, vigiaSolicitado => {
        if (vigiaSolicitado !== null) {
            const vigiaBox = gerarCancelamentoSolicitacaoVigiaBox(vigiaSolicitado)
            setVigiaBoxes([vigiaBox])
        }
        else {
            obterVigiasProximos(localizacao, vigias => {
                let boxesSelecionados = [];
                let boxes = vigias.map(vigia => {
                    let onPress = () => {
                        const solicitacao = gerarSolicitacao(vigia)
                        criarSolicitacaoVisita(solicitacao, () => {
                            boxesSelecionados = []
                            for (var i = 0; i < boxes.length; i++) {
                                if (boxes[i].key === vigia.id) {
                                    const boxSelecionado = gerarCancelamentoSolicitacaoVigiaBox(vigia)
                                    boxesSelecionados.push(boxSelecionado)
                                    break
                                }
                            }
                            boxes = boxesSelecionados
                            setVigiaBoxes(boxes)
                        })
                    }

                    return gerarVigiaBox(vigia, 'Solicitar Visita', styles.solicitarButton, onPress)
                })

                setVigiaBoxes(boxes)
            })
        }
    })

    useFocusEffect(
        React.useCallback(() => obterVigias(), [])
    )

    return (
        <Container>
            <HeaderBox style={{ marginBottom: 10 }} headers={['Encontre o vigia mais', 'próximo a você.']}
                detail={'Solicite seus valores. Vamos lá!'}
                color='white' />
            <ScrollView style={{ width: '100%' }}>
                <View style={{ alignItems: 'center' }}>
                    {vigiaBoxes}
                </View>
            </ScrollView>

        </Container>
    )
}