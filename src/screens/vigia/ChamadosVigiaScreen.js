import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react/cjs/react.development'
import CloseButton from '../../components/CloseButton'
import Container from '../../components/Container'
import HeaderBox from '../../components/HeaderBox'
import ImageBoxRightBar from '../../components/ImageBoxRightBar'
import TouchableButton from '../../components/TouchableButton'
import { aceitarChamado, obterChamadosAtivosVigia } from '../../services/chamado/chamado.service'
import { isChamadoAtivo, TipoSituacaoChamado } from '../../services/constantes'
import matisse from '../../style/matisse'

const styles = StyleSheet.create({
    header: {
        marginLeft: '5%',
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    textPequeno: {
        fontSize: 17,
        marginLeft: '5%',
        marginTop: '6%'
    },
    dataHora: {
        backgroundColor: matisse.laranja,
        borderRadius: 5,
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingRight: 5,
    }
})

const modalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: "white",
        borderRadius: 20,
        elevation: 3,
        alignItems: "center",
        width: '50%',
    },
    simButton: {
        backgroundColor: matisse.laranja,
        color: 'white',
        marginBottom: '10%',
        width: '50%'
    },
    simText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: '10%',
        marginTop: '10%',
        textAlign: "center"
    }
});

export default props => {
    const [state, setState] = useState({
        idVigia: 'asdf1234',
        modalVisible: false,
        idChamado: null,
        chamadosBoxes: []
    })

    const [idChamado, setIdChamado] = useState(null)
    const [modalVisivel, setModalVisivel] = useState(false)

    const obterChamados = () => obterChamadosAtivosVigia(state.idVigia, chamados => {
        var boxes = []
        const total = chamados.length

        let situacaoStyle = null
        for (let i = 0; i < total; i++) {
            let chamado = chamados[i]
            let situacaoStyle = { backgroundColor: isChamadoAtivo(chamado) ? 'green' : matisse.laranjaAvermelhado }
            let box =
                <ImageBoxRightBar
                    key={chamado.id}
                    iconStyle={{ backgroundColor: matisse.cinzaClaro }}
                    imagem={require('../../../images/usuario_branco_75.png')}
                    onPress={() => {
                        setIdChamado(chamado.id)
                        setModalVisivel(true)
                    }}
                >
                    <Text style={{ marginTop: 10, width: '100%', fontSize: 15, fontWeight: 'bold' }}>{chamado.nomeCliente}</Text>
                    <Text style={{ width: '100%' }}>{'Avenida Macunaíma, 1234'}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={styles.dataHora} >{chamado.hora}</Text>
                        <Text style={[styles.dataHora, { marginLeft: 10 }]} >{chamado.data}</Text>
                        <Text style={[styles.dataHora, { marginLeft: 10 }, situacaoStyle]} >{chamado.situacao}</Text>
                    </View>
                </ImageBoxRightBar>

            boxes.push(box)
        }
        setState({ ...state, chamadosBoxes: boxes })
    })

    useFocusEffect(
        React.useCallback(() => {
            obterChamados()
        }, [])
    );


    return (
        <Container>
            <ScrollView>
                <HeaderBox headers={['Acompanhe', 'todos os chamados']} detail='Chamados em aberto' />
                {state.chamadosBoxes}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisivel}
                >
                    <View style={modalStyles.modalContainer}>
                        <View style={modalStyles.modal}>
                            <Text style={modalStyles.modalText}>Confirma mesmo?</Text>
                            <CloseButton onPress={() => setModalVisivel(false)} />
                            <TouchableButton title='Sim' style={modalStyles.simButton}
                                styleText={modalStyles.simText} onPress={() => {
                                    aceitarChamado(idChamado, () => {
                                        console.info('aceitando o chamado: ' + idChamado)
                                        setModalVisivel(false)
                                        obterChamados(state.idVigia, boxes => setState({ ...state, chamadosBoxes: boxes }))
                                    })
                                }
                                } />
                        </View>
                    </View>
                </Modal>

            </ScrollView>

        </Container>
    )
}