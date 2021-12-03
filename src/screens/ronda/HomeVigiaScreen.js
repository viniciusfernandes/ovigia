import React from 'react'
import { useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Container from '../../components/Container'
import ImageBoxRightBar from '../../components/ImageBoxRightBar'
import { DEFAULT_POSITION } from '../../components/MapBox'
import TouchableButton from '../../components/TouchableButton'
import AuthContext from '../../contexts/AuthContext'
import matisse from '../../style/matisse'

import { useState } from 'react/cjs/react.development'
import { obterResumoRonda } from '../../services/ronda/ronda.service'
import { useFocusEffect } from '@react-navigation/core'
import { obterContratosVencidos } from '../../services/contrato/contrato.services'
import ContratoClienteBox from '../../components/ContratoClienteBox'
import FormArea from '../FormArea'
import HeaderBox from '../../components/HeaderBox'
import { obterIdVigiaSolicitado } from '../../services/solicitacaoVisita/solicitacao.visita.services'
import { obterMensalidadesVencidas, pagarMensalidade } from '../../services/mensalidade/mensalidade.service'

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        width: 80,
        height: 50
    },
    boxTitulo: {
        color: matisse.laranja,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '10%'
    },
    boxValor: {
        color: matisse.laranja,
        fontSize: 15,
        textAlign: 'center'
    },
    dataHora: {
        backgroundColor: matisse.laranja,
        borderRadius: 5,
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingRight: 5,
    },
    header: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: '5%',
        width: '100%'
    },
    iniciarRondaButton: {
        marginTop: '5%',
        width: '60%'
    },
    rondaDescricao: {
        color: matisse.laranja,
        width: '100%',
    },
    rondaTitulo: {
        color: matisse.laranja,
        marginTop: 10,
        width: '100%',
        fontSize: 15,
        fontWeight: 'bold'
    },
    textMensalidades: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: '2%',
        width: '80%',
        textAlign: 'left'
    },
    textPequeno: {
        fontSize: 17,
        marginLeft: '10%',
        marginTop: '6%'
    },
    titulo: {
        color: matisse.laranja,
        fontWeight: 'bold',
        paddingLeft: 5,
    },
})




export default props => {
    const { idUsuario } = useContext(AuthContext)
    const [mensalidadesBoxes, setMensalidadesBoxes] = useState([])
    const [valores, setValores] = useState({})
    const [resumoRonda, setResumoRonda] = useState({})

    const gerarBox = (titulo, valor) => {
        return (
            <View style={styles.box}>
                <Text style={styles.boxTitulo}>{titulo}</Text>
                <Text style={styles.boxValor}>{valor}</Text>
            </View>
        )
    }

    const gerarMensalidadesBoxes = mensalidades => {
        let boxesNaoSelecionados = []
        let valorAReceber = 0.0
        let boxes = mensalidades.map(mensalidade => {
            valorAReceber += mensalidade.valor
            return <ContratoClienteBox
                key={mensalidade.id}
                isVencimento
                contrato={mensalidade}
                confirmacao={'Recebeu o valor?'}
                onConfirm={() => {
                    pagarMensalidade(mensalidade.id, () => {
                        valorAReceber -= mensalidade.valor
                        boxesNaoSelecionados = []
                        for (let i = 0; i < boxes.length; i++) {
                            if (boxes[i].key !== mensalidade.id) {
                                boxesNaoSelecionados.push(boxes[i])
                            }
                        }
                        boxes = boxesNaoSelecionados
                        setMensalidadesBoxes(boxes)
                        setValores({ ...valores, valorAReceber })
                    })
                }}
            />
        }
        )
        setValores({ valorAReceber })
        setMensalidadesBoxes(boxes)
    }


    useFocusEffect(
        React.useCallback(() => {
            obterResumoRonda(idUsuario, resumoRonda => setResumoRonda(resumoRonda))
            obterMensalidadesVencidas(idUsuario, mensalidades => {
                gerarMensalidadesBoxes(mensalidades)
            })
        }, [])
    );

    return (
        <Container name='vigia' backgroundColor='white'>
            <HeaderBox color='black' headers={['Resumo da Ronda']} detail='e as suas mensalidades.' />
            <ImageBoxRightBar id='resumoronda'
                imagem={require('../../../images/escudocheck_laranja_75.png')}
                style={{ borderColor: matisse.laranja, borderWidth: 2, borderColor: matisse.laranja, height: 120, marginBottom: '5%' }}>
                <Text style={styles.rondaTitulo}>Resumo da Última Ronda!</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {gerarBox('Distância (km)', resumoRonda.distancia)}
                    {gerarBox(`Tempo (${resumoRonda.escalaTempo})`, resumoRonda.tempo)}
                    {gerarBox('Chamados', resumoRonda.totalChamados)}
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={styles.dataHora} >Data ronda:</Text>
                    <Text style={[styles.dataHora, { marginLeft: 15 }]} >{resumoRonda.data}</Text>
                </View>

            </ImageBoxRightBar>

            <View style={{ backgroundColor: matisse.cinzaClaro, height: 3, marginBottom: '5%', width: '80%' }} />

            <View style={{ alignItems: 'center' }}>
                <Text style={styles.textMensalidades}>Suas Mensalidades Vencidas. Total: {mensalidadesBoxes.length}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: '3%' }}>
                <Text style={{ marginRight: '5%', fontWeight: 'bold' }}  >À Receber: R$ {valores.valorAReceber}</Text>
                <Text style={{ marginLeft: '5%', fontWeight: 'bold' }} >Recebido: R$ {'0.00'}</Text>
            </View>
            <ScrollView style={{ width: '100%' }}>
                {mensalidadesBoxes}
            </ScrollView>
        </Container>

    )
}