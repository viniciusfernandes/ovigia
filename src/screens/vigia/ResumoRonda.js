import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Container from '../../components/Container'
import matisse from '../../style/matisse'

const styles = StyleSheet.create({
    header: {
        marginLeft: '5%',
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    textPequeno: {
        color: 'white',
        fontSize: 17,
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
        borderRadius: 5,
        flexDirection: 'row',
        height: '15%',
        justifyContent: 'space-between',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: '5%'
    },
    box: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 15,
        width: '30%',
        height: '100%',
    },
    boxTitulo: {
        color: matisse.laranja,
        textAlign: 'center',
        marginTop: '10%'
    },
    boxValor: {
        color: matisse.laranja,
        fontSize: 30,
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
            <Text style={[styles.header, { marginTop: '5%' }]}>Ronda Concluída!</Text>
            <Text style={styles.header}>Veja o seu resumo.</Text>

            <View style={styles.mapa}>
                <Text style={styles.header}>AQUI FICARÁ O mapa!!!</Text>
            </View>
            <Text style={styles.textPequeno}>Resumo</Text>

            <View style={styles.boxLine}>
                {gerarBox('Residência', 20)}
                {gerarBox('Kilômetros', '15')}
            </View>

            <View style={[styles.boxLine, { marginTop: '5%' }]}>
                {gerarBox('Tempo (h)', 20)}
                {gerarBox('Chamados', 11)}
            </View>


        </Container>


    )
}