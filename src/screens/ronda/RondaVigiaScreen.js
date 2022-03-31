import Geolocation from '@react-native-community/geolocation'
import haversine from 'haversine'
import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import Container from '../../components/Container'
import TouchableButton from '../../components/TouchableButton'
import { larguraPercentual } from '../../constantes/medidas/Medidas'
import AuthContext from '../../contexts/AuthContext'
import { criarRonda } from '../../services/ronda/ronda.service'
import matisse from '../../style/matisse'
const styles = StyleSheet.create({
    botao: {
        backgroundColor: 'white',
        width: larguraPercentual(45),
    },
    boxIcon: {
        marginTop: '20%',
        width: '30%',
        resizeMode: 'contain',
    },
    iniciarButton: {
        backgroundColor: matisse.verde,
        fontSize: 20,
        width: '45%'
    },
    pausarButton: {
        backgroundColor: matisse.laranjaAvermelhado,
        fontSize: 20,
        width: '45%'
    },
    concluirButton: {
        marginTop: '2%',
        fontSize: 20,
        width: '45%',
    },
    textoBotao: {
        color: matisse.laranja,
        fontSize: 20,
        textAlign: 'center'
    },
    textoHoras: {
        color: 'black',
        fontSize: 60,
        fontWeight: 'bold',
        marginBottom: '10%'
    },
    textoDistancia: {
        color: 'black',
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: '20%'
    },
    titulo: {
        color: matisse.laranja,
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: '10%'
    }
})

const INICIAR_RONDA = 'Iniciar Ronda'
const PAUSAR_RONDA = 'Pausar Ronda'
const DEFAULT_STATE = {
    coordinates: [],
    titulo: 'Vamos Começar?',
    iniciarRondaStyle: styles.iniciarButton,
    iniciarRondaTitulo: INICIAR_RONDA,
    inicio: null,
    distancia: 0.00,
    watchID: null
}
const DEFAULT_TEMPO = {
    horas: 0,
    minutos: 0,
    segundos: 0,
    tempoFormatado: '00:00:00'
}
const calcularDistancia = (prevCoord, currCoord) => {
    if (!prevCoord || !currCoord) {
        return 0.00
    }
    return haversine(prevCoord, currCoord) || 0.00;
}


const atualizarTempo = tempoRonda => {
    let horas = tempoRonda.horas
    let minutos = tempoRonda.minutos
    let segundos = tempoRonda.segundos + 1

    if (segundos >= 60) {
        minutos++
        segundos = 0
    }

    if (minutos >= 60) {
        horas++
        minutos = 0
    }
    let tempoFormatado = ''
    tempoFormatado = horas <= 9 ? '0' + horas : horas
    tempoFormatado += ':'
    tempoFormatado += minutos <= 9 ? '0' + minutos : minutos
    tempoFormatado += ':'
    tempoFormatado += segundos <= 9 ? '0' + segundos : segundos
    return { horas: horas, minutos: minutos, segundos: segundos, tempoFormatado: tempoFormatado }
}

export default props => {
    const { idUsuario } = useContext(AuthContext)
    const [state, setState] = useState(DEFAULT_STATE)
    const [rondaEmAndamento, setRondaEmAndamento] = useState(false)
    const [tempoRonda, setTempoRonda] = useState(DEFAULT_TEMPO)
    const [distancia, setDistancia] = useState(0.00)

    useEffect(() => {
        if (rondaEmAndamento) {
            const interval = setInterval(() => {
                setTempoRonda(tempoRonda => atualizarTempo(tempoRonda))
            }, 1000)
            setState({ ...state, interval: interval })
        }
    }, [rondaEmAndamento])

    const atualizarDistancia = coordinates => {
        if (coordinates.length <= 1) {
            return
        }
        const prevCoord = coordinates[coordinates.length - 2]
        const currCoord = coordinates[coordinates.length - 1]
        const dist = calcularDistancia(prevCoord, currCoord)
        if (dist >= 0) {
            setDistancia(distancia => distancia + 10)
        }
    }

    const iniciarRonda = () => {
        setRondaEmAndamento(true)
        const watchID = Geolocation.watchPosition(
            position => {
                const currCoord = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    timestamp: position.timestamp,
                    velocidade: position.coords.speed
                }
                state.coordinates.push(currCoord)
                console.warn(state.coordinates.length)
                atualizarDistancia(state.coordinates)
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 1
            }
        )

        setState({
            ...state,
            iniciarRondaStyle: styles.pausarButton,
            iniciarRondaTitulo: PAUSAR_RONDA,
            titulo: 'Ronda Iniciada...',
            inicio: new Date(),
            distancia: 0.00,
            watchID: watchID
        })
    }


    const pausarRonda = () => {
        Geolocation.clearWatch(state.watchID);
        clearInterval(state.interval)
        //setRondaEmAndamento(false)
        setState({
            ...state, rondaIniciada: false,
            interval: null,
            watchID: null,
            iniciarRondaStyle: styles.iniciarButton,
            iniciarRondaTitulo: INICIAR_RONDA,
            titulo: 'Ronda Pausada!'
        })

    }


    const concluirRonda = () => {
        const ronda = {
            idVigia: idUsuario,
            localizacoes: state.coordinates,
            inicio: state.inicio,
            fim: new Date()
        }
        criarRonda(ronda, response => {
            Geolocation.clearWatch(state.watchID);
            clearInterval(state.interval)
            setState(DEFAULT_STATE)
            setRondaEmAndamento(false)
            setTempoRonda(DEFAULT_TEMPO)
            props.navigation.navigate('homeVigia')
        })
    }

    return (
        <Container backgroundColor='white'>
            <Image
                style={styles.boxIcon}
                source={require('../../../images/check_branco_75.png')}
            />
            <Text style={styles.titulo}> {state.titulo}</Text>
            <Text style={styles.textoHoras}>{tempoRonda.tempoFormatado} hs</Text>
            <Text style={styles.textoDistancia}>{state.distancia} km</Text>
            <TouchableButton title={state.iniciarRondaTitulo}
                style={state.iniciarRondaStyle}
                styleText={{ fontSize: 20, color: 'white', }}
                onPress={state.inicio ? pausarRonda : iniciarRonda}
            />
            <TouchableButton title='Concluir Ronda' style={styles.concluirButton}
                styleText={{ fontSize: 20 }}
                onPress={concluirRonda}
            />
        </Container>
    )
}
