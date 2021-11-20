import React from 'react'
import { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Container from '../../components/Container'
import HeaderBox from '../../components/HeaderBox'
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
    const { idUsuario, nomeUsuario } = useContext(AuthContext)
    const [contratosBoxes, setContratosBoxes] = useState([])
    const [resumoRonda, setResumoRonda] = useState({})

    const gerarBox = (titulo, valor) => {
        return (
            <View style={styles.box}>
                <Text style={styles.boxTitulo}>{titulo}</Text>
                <Text style={styles.boxValor}>{valor}</Text>
            </View>
        )
    }

    const gerarContratosBoxes = (contratos) => {
        return contratos.map(contrato => {
            console.info(JSON.stringify(contrato))

            return <ContratoClienteBox key={contrato.idCliente}
                isVencimento
                contrato={contrato}
                confirmacao={'Recebeu o valor?'}
            />
        }
        )
    }

    useFocusEffect(
        React.useCallback(() => {
            obterResumoRonda(idUsuario, resumoRonda => setResumoRonda(resumoRonda))
            obterContratosVencidos(idUsuario, contratos => setContratosBoxes(gerarContratosBoxes(contratos)))
        }, [])
    );


    return (
        <Container>
            <HeaderBox color='white' headers={['Olá, ' + nomeUsuario, 'Vamos começar?']} detail='Ronda e Mensalidade' />
            <ImageBoxRightBar
                imagem={require('../../../images/escudocheck_laranja_75.png')}
                style={{ height: 120 }}>
                <Text style={styles.rondaTitulo}>Resumo da Última Ronda!</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {gerarBox('Distância (km)', resumoRonda.distancia)}
                    {gerarBox(`Tempo (${resumoRonda.escalaTempo})`, resumoRonda.tempo)}
                    {gerarBox('Chamados', resumoRonda.totalChamados)}
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={styles.dataHora} >{resumoRonda.hora}</Text>
                    <Text style={[styles.dataHora, { marginLeft: 15 }]} >{resumoRonda.data}</Text>
                </View>

            </ImageBoxRightBar>

            <ImageBoxRightBar
                imagem={require('../../../images/sino_laranja_75.png')}>
                <Text style={styles.rondaTitulo}>Você tem Mensalidades!</Text>
                <Text style={styles.rondaDescricao}>Veja as datas de vecimentos</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.dataHora} >Total:</Text>
                    <Text style={[styles.dataHora, { marginLeft: 15 }]} >12</Text>
                </View>

            </ImageBoxRightBar>
            {contratosBoxes}

        </Container>
    )
}