import { useFocusEffect } from '@react-navigation/core'
import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Container from '../../components/Container'
import HeaderBox from '../../components/HeaderBox'
import ImageBoxRightBar from '../../components/ImageBoxRightBar'
import AuthContext from '../../contexts/AuthContext'
import { aceitarChamado, cancelarChamado, encerrarChamado, obterChamadosAbertosVigia } from '../../services/chamado/chamado.service'
import { isChamadoAberto, isChamadoAceito, isChamadoAtivo } from '../../services/constantes'
import matisse from '../../style/matisse'
import TouchableButton from '../../components/TouchableButton'

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
    },
    chamadoBox: {
        backgroundColor: 'white',
        borderColor: matisse.laranja,
        borderWidth: 2,
        marginBottom: '5%'
    },
    cancelarButton: {
        backgroundColor: matisse.laranjaAvermelhado,
        width: '35%'
    },
    aceitarButton: {
        backgroundColor: matisse.laranja,
        width: '35%'
    },
    titleButton: {
        color: 'white'
    }

})

export default props => {
    const { idUsuario } = useContext(AuthContext)
    const [state, setState] = useState({
        idVigia: null,
        modalVisible: false,
        idChamado: null,
        chamadosBoxes: []
    })

    const removerChamado = (chamado, boxes) => {
        const boxesSelecionados = boxes.filter(box => box.key !== chamado.id)
        setState({ ...state, chamadosBoxes: boxesSelecionados })
    }

    const gerarChamadosBoxes = idUsuario => obterChamadosAbertosVigia(idUsuario, chamados => {
        let boxes = chamados.map(chamado => {
            let situacaoStyle
            if (isChamadoAtivo(chamado)) {
                situacaoStyle = { backgroundColor: 'green' }
            } else if (isChamadoAceito(chamado)) {
                situacaoStyle = { backgroundColor: matisse.amareloDourado }
            } else {
                situacaoStyle = { backgroundColor: matisse.laranjaAvermelhado }
            }

            let oKButton
            if (chamado.situacao === 'ATIVO') {
                oKButton = <TouchableButton title='Aceitar'
                    style={styles.aceitarButton}
                    styleText={styles.titleButton}
                    onPress={() => aceitarChamado(chamado.id, () => gerarChamadosBoxes(idUsuario))} />
            } else {
                oKButton = <TouchableButton title='Encerrar'
                    style={styles.aceitarButton}
                    styleText={styles.titleButton}
                    onPress={() => encerrarChamado(chamado.id, () => removerChamado(chamado, boxes))} />
            }


            return (
                <ImageBoxRightBar
                    key={chamado.id}
                    style={styles.chamadoBox}
                    iconStyle={{ backgroundColor: matisse.cinzaClaro }}
                    imagem={require('../../../images/usuario_branco_75.png')}
                >
                    <Text style={{ marginTop: 10, width: '100%', fontSize: 15, fontWeight: 'bold' }}>{chamado.nomeCliente}</Text>
                    <Text style={{ width: '100%' }}>{'Avenida Macunaíma, 1234'}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={styles.dataHora} >{chamado.hora}</Text>
                        <Text style={[styles.dataHora, { marginLeft: 10 }]} >{chamado.data}</Text>
                        <Text style={[styles.dataHora, { marginLeft: 10 }, situacaoStyle]} >{chamado.situacao}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 10, marginTop: 10, justifyContent: 'space-evenly' }}>
                        <TouchableButton title='Cancelar'
                            style={styles.cancelarButton}
                            styleText={styles.titleButton}
                            onPress={() => cancelarChamado(chamado.id, () => removerChamado(chamado, boxes))} />
                        {oKButton}
                    </View>
                </ImageBoxRightBar>
            )
        })
        setState({ ...state, chamadosBoxes: boxes })
    })

    useFocusEffect(
        React.useCallback(() => {
            gerarChamadosBoxes(idUsuario)
        }, [])
    );

    return (
        <Container backgroundColor='white'>
            <HeaderBox headers={['Acompanhe', 'todos os chamados']} detail='Chamados Ativos'
                color='black' />

            <ScrollView>
                {state.chamadosBoxes}
            </ScrollView>

        </Container>
    )
}