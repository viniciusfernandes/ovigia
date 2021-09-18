import React, { useEffect } from 'react'
import Geolocation from '@react-native-community/geolocation'
import { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Container from '../../components/Container'
import HeaderBox from '../../components/HeaderBox'
import ImageBoxRightBar from '../../components/ImageBoxRightBar'
import MapBox, { DEFAULT_POSITION } from '../../components/MapBox'
import TouchableButton from '../../components/TouchableButton'
import AuthContext from '../../contexts/AuthContext'
import RondaVigiaContext, { RondaVigiaContextProvider } from '../../contexts/RondaVigiaContext'
import matisse from '../../style/matisse'
import { useState } from 'react/cjs/react.development'


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
    textPequeno: {
        fontSize: 17,
        marginLeft: '10%',
        marginTop: '6%'
    }
})

export default props => {
    const { nomeUsuario } = useContext(AuthContext)
    const { coordinates, iniciarRonda } = useContext(RondaVigiaContext)
    const [currentPosition, setCurrentPosition] = useState(DEFAULT_POSITION)

    useEffect(() => {
        // console.info('init useEffect: ')
        Geolocation.getCurrentPosition(
            position => {
                setCurrentPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                })
                // console.info('getting position: ' + JSON.stringify(position))
            },
            error => console.error(error.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
        // console.info('end useEffect: ')
    }, [])
    // console.info('current position:   ' + JSON.stringify(currentPosition))
    return (
        <Container >
            <HeaderBox headers={['Olá, ' + nomeUsuario, 'Vamos começar?']} detail='Ronda' />
            <MapBox coordinates={[currentPosition]} />
            <TouchableButton style={styles.iniciarRondaButton} styleText={{ fontSize: 20 }}
                title="Iniciar Ronda"
                onPress={() => {
                    iniciarRonda()
                    props.navigation.navigate('rondaVigia')
                }} />


            <ImageBoxRightBar
                imagem={require('../../../images/escudocheck_laranja_75.png')}>
                <Text style={styles.rondaTitulo}>Ronda Concluída!</Text>
                <Text style={styles.rondaDescricao}>Concluiu na data:</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.dataHora} >12:43</Text>
                    <Text style={[styles.dataHora, { marginLeft: 15 }]} >12/12/2021</Text>
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
        </Container>
    )
}