import { useFocusEffect } from '@react-navigation/core'
import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Container from '../../components/Container'
import HeaderBox from '../../components/HeaderBox'
import ImageBoxRightBar from '../../components/ImageBoxRightBar'
import ConfirmacaoModalBox from '../../components/ConfirmacaoModalBox'
import AuthContext from '../../contexts/AuthContext'
import { aceitarChamado, obterChamadosAtivosVigia } from '../../services/chamado/chamado.service'
import { isChamadoAtivo } from '../../services/constantes'
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

export default props => {
    const { idUsuario } = useContext(AuthContext)
    const [state, setState] = useState({
        idVigia: null,
        modalVisible: false,
        idChamado: null,
    })
    const [idChamado, setIdChamado] = useState(null)
    const [modalVisivel, setModalVisivel] = useState(false)
    const [chamadosBoxes, setChamadosBoxes] = useState([])

    const gerarChamadosBoxes = idUsuario => obterChamadosAtivosVigia(idUsuario, chamados => {
        let boxes = chamados.map(chamado => {
            let situacaoStyle = { backgroundColor: isChamadoAtivo(chamado) ? 'green' : matisse.laranjaAvermelhado }
            return (
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
            )
        })
        setChamadosBoxes(boxes)
    })

    useFocusEffect(
        React.useCallback(() => {
            gerarChamadosBoxes(idUsuario)
        }, [])
    );

    return (
        <Container>
            <HeaderBox headers={['Acompanhe', 'todos os chamados']} detail='Chamados Ativos'
                color='white' />

            <ScrollView>
                {chamadosBoxes}
                <ConfirmacaoModalBox visible={modalVisivel}
                    onClose={() => setModalVisivel(false)}
                    onConfirm={() => {
                        aceitarChamado(idChamado,
                            () => {
                                setModalVisivel(false)
                                gerarChamadosBoxes(state.idVigia, boxes => setState({ ...state, chamadosBoxes: boxes }))
                            }
                        )
                    }
                    }
                />

            </ScrollView>

        </Container>
    )
}