import React from 'react'
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react/cjs/react.development'
import Container from '../../components/Container'
import HeaderBox from '../../components/HeaderBox'
import ImageBoxRightBar from '../../components/ImageBoxRightBar'
import ModalBox from '../../components/ModalBox'
import TouchableButton from '../../components/TouchableButton'
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
    const idVigia = 'asdf1234'
    const [chamadoBoxes, setChamadoBoxes] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [idChamado, setIdChamado] = useState(null)

    obterChamadosAtivos(idVigia, chamados => {
        const total = chamados.length
        let chamadosBoxes = []
        var box = null
        var chamado = null
        var situacaoStyle = null
        for (var i = 0; i < total; i++) {
            chamado = chamados[i]
            situacaoStyle = { backgroundColor: TipoSituacaoChamado.isAberto(chamado.situacao) ? 'green' : matisse.amareloDourado }
            box =
                <ImageBoxRightBar
                    key={'box' + i}
                    iconStyle={{ backgroundColor: matisse.cinzaClaro }}
                    imagem={require('../../../images/usuario_branco_75.png')}
                    onPress={() => {
                        console.info('chamado id: '+chamado.id)
                        setIdChamado(chamado.id)
                        setModalVisible(true)
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

            chamadosBoxes.push(box)
        }
        setChamadoBoxes(chamadosBoxes)
    })
    return (
        <Container>
            <ScrollView>
                <HeaderBox headers={['Acompanhe', 'todos os chamados']} detail='Chamados em aberto' />
                {chamadoBoxes}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={modalStyles.modalContainer}>
                        <View style={modalStyles.modal}>
                            <Text style={modalStyles.modalText}>Confirma mesmo?</Text>
                            <TouchableButton title='Sim' style={modalStyles.simButton}
                                styleText={modalStyles.simText} onPress={() => {
                                    setModalVisible(false)
                                    aceitarChamado(idChamado)
                                }
                                } />
                        </View>
                    </View>
                </Modal>

            </ScrollView>

        </Container>
    )
}