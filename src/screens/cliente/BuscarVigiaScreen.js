import { useFocusEffect } from "@react-navigation/core"
import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { useContext, useState } from "react/cjs/react.development"
import Container from "../../components/Container"
import HeaderBox from "../../components/HeaderBox"
import VigiaRatingBox from "../../components/VigiaRatingBox"
import AuthContext from "../../contexts/AuthContext"
import { criarSolicitacaoVisita, obterIdVigiaSolicitado } from "../../services/solicitacaoVisita/solicitacao.visita.services"
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
    const [idVigiaSolicitado, setIdVigiaSolicitado] = useState(null)
    const obterVigias = (localizacao, idVigiaSolicitado) => obterVigiasProximos(localizacao, vigias => {
        let boxes = []
        var idSolicitado = idVigiaSolicitado

        vigias.forEach(vigia => {
            let idVigia = vigia.id
            let isSolicitado = idVigia === idVigiaSolicitado
            let box = <VigiaRatingBox id={idVigia}
                style={styles.button}
                styleButton={isSolicitado ? styles.cancelarButton : styles.solicitarButton}
                icon={require('../../../images/usuario_branco_75.png')}
                vigia={vigia}
                buttonTitle={isSolicitado ? 'Cancelar Solicitação ' : 'Solicitar Visita'}
                onPress={() => {
                    let solicitacao = {
                        idCliente: idUsuario,
                        nomeCliente: nomeUsuario,
                        telefoneCliente: telefoneUsuario,
                        idVigia: vigia.id,
                        localizacaoCliente: localizacao
                    }
                    criarSolicitacaoVisita(solicitacao, () => {
                        let vigiasRestantes = []
                        for (var i = 0; i < boxes.length; i++) {
                            if (boxes[i].props.id !== solicitacao.idVigia) {
                                vigiasRestantes.push(boxes[i])
                            }
                        }
                        console.info('total: ' + vigiasRestantes.length)
                        setVigiaBoxes(boxes)
                    })
                }}
                showMensalidade />
            boxes.push(box)
        })
        setVigiaBoxes(boxes)
    })

    useFocusEffect(
        React.useCallback(() => {
            obterIdVigiaSolicitado(idUsuario, response => {
                const idVigia = response !== null ? response.idVigia : null
                obterVigias(localizacao, idVigia)
                setIdVigiaSolicitado(idVigia)
            })
        }, [])
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