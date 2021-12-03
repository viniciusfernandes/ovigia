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


    const gerarVigiasBoxes = (localizacao, idVigiaSolicitado) => obterVigiasProximos(localizacao, vigias => {
        let boxesSelecionados = [];
        let boxes = vigias.filter(vigia => idVigiaSolicitado === null ? true : vigia.id === idVigiaSolicitado)
            .map(vigia => {
                let buttonConfig
                if (vigia.id === idVigiaSolicitado) {
                    buttonConfig = { style: styles.cancelarButton, title: 'Cancelar Solicitação' }
                } else {
                    buttonConfig = { style: styles.solicitarButton, title: 'Solicitar Visita' }
                }

                return <VigiaRatingBox key={vigia.id}
                    style={styles.button}
                    styleButton={buttonConfig.style}
                    icon={require('../../../images/usuario_branco_75.png')}
                    vigia={vigia}
                    buttonTitle={buttonConfig.title}
                    onPress={() => {
                        let solicitacao = {
                            idCliente: idUsuario,
                            nomeCliente: nomeUsuario,
                            telefoneCliente: telefoneUsuario,
                            idVigia: vigia.id,
                            localizacaoCliente: localizacao
                        }
                        criarSolicitacaoVisita(solicitacao, () => {
                            boxesSelecionados = []
                            for (var i = 0; i < boxes.length; i++) {
                                if (boxes[i].key === vigia.id) {
                                    boxesSelecionados.push(boxes[i])
                                }
                            }
                            boxes = boxesSelecionados
                            setVigiaBoxes(boxes)
                        })
                    }}
                    showMensalidade />

            })
        setVigiaBoxes(boxes)
    })

    useFocusEffect(
        React.useCallback(() => {
            obterIdVigiaSolicitado(idUsuario, response => {
                const idVigiaSolicitado = response !== null ? response.idVigia : null
                gerarVigiasBoxes(localizacao, idVigiaSolicitado)

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