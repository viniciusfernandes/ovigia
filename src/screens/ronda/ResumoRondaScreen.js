import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Container from '../../components/Container'
import matisse from '../../style/matisse'
import Medidas, { larguraPercentual } from '../../constantes/medidas/Medidas'
import MapView, { Marker } from 'react-native-maps'
import MapBox from '../../components/MapBox'
import HeaderBox from '../../components/HeaderBox'
import { useContext } from 'react/cjs/react.development'

const isTablet = Medidas.isTablet
const boxSize = larguraPercentual(22)
let styles = StyleSheet.create({
    header: {
        marginLeft: '5%',
        color: 'white',
        fontSize: isTablet ? 35 : 25,
        fontWeight: 'bold'
    },
    textPequeno: {
        color: 'white',
        fontSize: isTablet ? 30 : 20,
        marginLeft: '5%',
        marginTop: '5%',
        marginBottom: '5%'
    },
    boxLine: {
        flexDirection: 'row',
        height: boxSize,
        justifyContent: 'space-between',
        marginBottom: '5%',
        marginTop: '2%',
        paddingLeft: '20%',
        paddingRight: '20%',
        width: '100%',
    },
    box: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        width: boxSize,
    },
    boxTitulo: {
        color: matisse.laranja,
        fontSize: isTablet ? 25 : 10,
        textAlign: 'center',
        marginTop: '10%'
    },
    boxValor: {
        color: matisse.laranja,
        fontSize: isTablet ? 45 : 30,
        textAlign: 'center'
    }
})


function gerarBox(titulo, valor) {
    return (
        <View style={styles.box}>
            <Text style={styles.boxTitulo}>{titulo}</Text>
            <Text style={styles.boxValor}>{valor}</Text>
        </View>
    )
}

export default props => {
    const resumo = props.route.params
    console.info('resumo: ' + JSON.stringify(resumo))
    return (
        <Container>
            <HeaderBox headers={['Ronda Concluída!', 'Veja o seu resumo.']} detail='Resumo' />

            <MapBox coordinates={[]} />

            <View style={styles.boxLine}>
                {gerarBox('Residência', 20)}
                {gerarBox('Kilômetros', resumo.distancia)}
            </View>

            <View style={styles.boxLine}>
                {gerarBox(`Tempo (${resumo.escalaTempo})`, resumo.tempo)}
                {gerarBox('Chamados', 11)}
            </View>


        </Container>


    )
}