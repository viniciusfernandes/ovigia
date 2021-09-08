import React from 'react'
import { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Container from '../../components/Container'
import ImageBoxRightBar from '../../components/ImageBoxRightBar'
import MapBox from '../../components/MapBox'
import TouchableButton from '../../components/TouchableButton'
import AuthContext from '../../contexts/AuthContext'
import matisse from '../../style/matisse'


const styles = StyleSheet.create({
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
    textAtividade: {
        color: matisse.laranja,
        fontSize: 17,
        marginLeft: '5%',
    },
    textPequeno: {
        fontSize: 17,
        marginLeft: '10%',
        marginTop: '6%'
    }
})

export default props => {
    const { nomeUsuario } = useContext(AuthContext)

    return (
        <Container>
            <View style={{ width: '100%', marginTop: '10%' }}>
                <Text style={[styles.header]}>Olá {nomeUsuario}</Text>
                <Text style={styles.header}>Vamos começar?</Text>
                <Text style={[styles.header, styles.textPequeno]}>Ronda</Text>
            </View>
            <MapBox />
            <TouchableButton style={styles.iniciarRondaButton} styleText={{ fontSize: 20 }}
                title="Iniciar Ronda"
                onPress={() => props.navigation.navigate('rondaVigia')} />

            <View style={{ width: '100%' }}>
                <Text style={styles.textAtividade}>Atividades</Text>
            </View>
            <ImageBoxRightBar
                key='143'
                imagem={require('../../../images/escudocheck_laranja_75.png')}>
                <Text style={styles.rondaTitulo}>Ronda Concluída!</Text>
                <Text style={styles.rondaDescricao}>Concluiu na data:</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.dataHora} >12:43</Text>
                    <Text style={[styles.dataHora, { marginLeft: 15 }]} >12/12/2021</Text>
                </View>

            </ImageBoxRightBar>
            <ImageBoxRightBar
                key='123'
                imagem={require('../../../images/sino_laranja_75.png')}>
                <Text style={styles.rondaTitulo}>Você tem Mensalidades!</Text>
                <Text style={styles.rondaDescricao}>Veja as datas de vecimentos</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.dataHora} >Total:</Text>
                    <Text style={[styles.dataHora, { marginLeft: 15 }]} >12</Text>
                </View>

            </ImageBoxRightBar>
        </Container>
    )
}