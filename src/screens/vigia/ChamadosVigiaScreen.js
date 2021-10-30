import React, { useEffect } from 'react'
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react/cjs/react.development'
import CloseButton from '../../components/CloseButton'
import Container from '../../components/Container'
import HeaderBox from '../../components/HeaderBox'
import ImageBoxRightBar from '../../components/ImageBoxRightBar'
import ModalBox from '../../components/ModalBox'
import TouchableButton from '../../components/TouchableButton'
import { axiosInstance } from '../../services/api'
import { aceitarChamado, obterChamadosAtivos } from '../../services/chamado/chamado.service'
import { TipoSituacaoChamado } from '../../services/constantes'
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
    var boxes = []
    console.info('init boxes: ' + boxes.length)

    useEffect(() => {
        obterChamadosAtivos(state.idVigia, chamados => {
            console.info('obtendo os chamados   ')
            const total = chamados.length
            var box = null
            var chamado = null
            var situacaoStyle = null
            for (var i = 0; i < total; i++) {
                chamado = chamados[i]
                situacaoStyle = { backgroundColor: TipoSituacaoChamado.isAberto(chamado.situacao) ? 'green' : matisse.amareloDourado }
                box =
                    <ImageBoxRightBar
                        key={chamado.id}
                        iconStyle={{ backgroundColor: matisse.cinzaClaro }}
                        imagem={require('../../../images/usuario_branco_75.png')}
                        onPress={() => {
                            setState({ ...state, idChamado: chamado.id, modalVisible: true })
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
            console.info('total boxes: ' + boxes.length)
            setState({ ...state, chamadosBoxes: boxes })
        })
    }, [])

    return (
        <Container>
            <ScrollView>
                <HeaderBox headers={['Acompanhe', 'todos os chamados']} detail='Chamados em aberto' />
                {state.chamadosBoxes}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={state.modalVisible}
                >
                    <View style={modalStyles.modalContainer}>
                        <View style={modalStyles.modal}>
                            <Text style={modalStyles.modalText}>Confirma mesmo?</Text>
                            <CloseButton onPress={() => setState({ ...state, modalVisible: false })} />
                            <TouchableButton title='Sim' style={modalStyles.simButton}
                                styleText={modalStyles.simText} onPress={() => {
                                    aceitarChamado(state.idChamado, () => setState({ ...state, modalVisible: false }))
                                }
                                } />
                        </View>
                    </View>
                </Modal>

            </ScrollView>

        </Container>
    )
}