import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Container from '../../components/Container'
import matisse from '../../style/matisse'
import Medidas, { larguraPercentual } from '../../constantes/medidas/Medidas'

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
        fontSize: isTablet ? 30 : 17,
        marginLeft: '5%',
        marginTop: '5%'
    },
    mapa: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: '35%',
        marginTop: '5%',
        marginLeft: '10%',
        marginRight: '10%',
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
    return (
        <Container>
            <Text style={[styles.header, { marginTop: '2%' }]}>Ronda Concluída!</Text>
            <Text style={styles.header}>Veja o seu resumo.</Text>

            <View style={styles.mapa}>
                <Text style={styles.header}>AQUI FICARÁ O mapa!!!</Text>
            </View>
            <Text style={styles.textPequeno}>Resumo</Text>

            <View style={styles.boxLine}>
                {gerarBox('Residência', 20)}
                {gerarBox('Kilômetros', '15')}
            </View>

            <View style={styles.boxLine}>
                {gerarBox('Tempo (h)', 20)}
                {gerarBox('Chamados', 11)}
            </View>


        </Container>


    )
}