import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Container from '../../components/Container'
import matisse from '../../style/matisse'

const styles = StyleSheet.create({
    header: {
        marginLeft: 10,
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    textPequeno: {
        color: 'white',
        fontSize: 17,
        marginLeft: 20,
        marginTop: 30
    },
    mapa: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: 250,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
    },
    horizontalBoxes: {
        borderRadius: 5,
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between',
        marginLeft: 80,
        marginRight: 80,
        marginTop: 10
    },
    box: {
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 15,
        width: 80,
        height: 80,
    },
    boxTitulo: {
        color: matisse.laranja,
        textAlign: 'center',
        marginTop: 10
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
            <Text style={[styles.header, { marginTop: 50 }]}>Ronda Concluída!</Text>
            <Text style={styles.header}>Veja o seu resumo.</Text>

            <View style={styles.mapa}>
                <Text style={styles.header}>AQUI FICARÁ O mapa!!!</Text>
            </View>
            <Text style={styles.textPequeno}>Resumo</Text>

            <View style={styles.horizontalBoxes}>
                {gerarBox('Residência', 20)}
                {gerarBox('Kilômetros', '15')}
            </View>

            <View style={[styles.horizontalBoxes, { marginTop: 60 }]}>
                {gerarBox('Tempo (h)', 20)}
                {gerarBox('Chamados', 11)}
            </View>


        </Container>


    )
}