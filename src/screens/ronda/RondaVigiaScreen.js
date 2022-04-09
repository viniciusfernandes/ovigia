
import React, { useContext, useState, useEffect } from 'react'
import haversine from 'haversine'
import { StyleSheet, Text, Image, View } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import Container from '../../components/Container'
import TouchableButton from '../../components/TouchableButton'
import { larguraPercentual } from '../../constantes/medidas/Medidas'
import AuthContext from '../../contexts/AuthContext'
import { criarRonda } from '../../services/ronda/ronda.service'
import matisse from '../../style/matisse'
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';

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
    tempoFormatado: {
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: '1%'
    },
    textoMenor: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: '5%'
    },
    titulo: {
        color: matisse.laranja,
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: '10%'
    },
    circulo: {
        backgroundColor: matisse.laranjaClaro,
        borderColor: matisse.laranja,
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 120,
        alignItems: 'center',
        height: 200,
        width: 200
    },
    circuloMenor: {
        backgroundColor: 'white',
        borderColor: matisse.laranja,
        justifyContent: 'center',
        borderWidth: 5,
        borderRadius: 90,
        alignItems: 'center',
        height: 180,
        width: 180
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
    watchID: null,
    iniciarTempo: false,
    rondaIniciada: false
}
const DEFAULT_TEMPO = {
    horas: 0,
    minutos: 0,
    segundos: 0,
    tempoFormatado: '00:00',
    segundosFormatado: '00'
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

    const segundosFormatado = segundos <= 9 ? '0' + segundos : segundos
    return {
        horas: horas,
        minutos: minutos,
        segundos: segundos,
        tempoFormatado: tempoFormatado,
        segundosFormatado: segundosFormatado
    }
}

const gerarRonda = (idVigia, state) => {
    return ({
        idVigia: idVigia,
        localizacoes: state.coordinates,
        inicio: state.inicio,
        fim: new Date()
    })

}

export default props => {
    const { idUsuario } = useContext(AuthContext)
    const [state, setState] = useState(DEFAULT_STATE)
    const [tempoRonda, setTempoRonda] = useState(DEFAULT_TEMPO)
    const [distancia, setDistancia] = useState(11.00)

    if (state.iniciarTempo) {
        const interval = setInterval(() => {
            setTempoRonda(tempoRonda => atualizarTempo(tempoRonda))
        }, 1000)
        setState({ ...state, interval: interval, iniciarTempo: false })
    }

    const atualizarDistancia = coordinates => {
        const prevCoord = coordinates[coordinates.length - 2]
        const currCoord = coordinates[coordinates.length - 1]
        let dist = calcularDistancia(prevCoord, currCoord)
        setDistancia(distTotal => (parseFloat(distTotal) + dist).toFixed(2))

    }

    const atualizarRonda = () => {
        if (state.coordinates.length >= 10) {
            // alert('atualizando a ronda parcialmente=' + new Date() + 'Total=' + state.coordinates.length)
            const ronda = gerarRonda(idUsuario, state)
            criarRonda(ronda, () => {
                // console.warn('ATUALIZOU RONDA PARCIALMENTE')
                setState(state => ({ ...state, coordinates: [] }))
            }, () => console.warn('Erro ao enviar as coordenadas da ronda!'))
        }
    }

    let locationPermited
    useEffect(() => {
        locationPermited = requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION])
            .then(
                (statuses) => {
                    //statuses é um vetor que contém as respostas escolhidas pelo usuário em cada uma das autorizações solicitadas.
                    const statusFine = statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];  //pegamos a autorização que o usuário selecionou para uso do GPS e para obter localização em primeiro plano
                    const statusBack = statuses[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION];
                    //pegamos a autorização que o usuário selecionou para localização em background 
                    if (Platform.Version < 29) {
                        //Em APIs do Android abaixo da 29 não é necessário permissão para background location, apenas solicitar acesso ao GPS já oferece tudo que é necessário para utilizar a localização em primeiro e segundo plano. Nesse caso, apenas verificamos se a autorização do GPS é positiva
                        if (statusFine == 'granted') {
                            return true;
                        } else {
                            setErrorMsg('Usuário não aceitou solicitação de uso do GPS');
                        }
                    }
                    // Caso a API seja > 29, é necessário verificar se ambas as autorizações foram positivas. 
                    if (statusFine == 'granted' && statusBack == 'granted') {
                        return true;
                    } else {
                        setErrorMsg('Usuário não aceitou solicitação de uso do GPS');
                    }
                },
            )
        if (!locationPermited) {
            alert('Localizacao nao permitida!!!')
        }
    }, [])


    const iniciarRonda = () => {
        const watchID = Geolocation.watchPosition(
            position => {
                const currCoord = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    timestamp: position.timestamp,
                    velocidade: position.coords.speed
                }
                state.coordinates.push(currCoord)
                // alert('coords atual=' + state.coordinates.length)
                atualizarDistancia(state.coordinates)
                atualizarRonda()
            },
            error => console.error(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 1
            }
        )
        setState(state => ({
            ...state,
            iniciarRondaStyle: styles.pausarButton,
            iniciarRondaTitulo: PAUSAR_RONDA,
            titulo: 'Ronda Iniciada',
            inicio: state.inicio ? state.inicio : new Date(),
            // watchID: watchID,
            iniciarTempo: true,
            rondaIniciada: true
        }))
    }

    const pausarRonda = () => {
        Geolocation.clearWatch(state.watchID);
        clearInterval(state.interval)
        setState({
            ...state, rondaIniciada: false,
            interval: null,
            watchID: null,
            iniciarRondaStyle: styles.iniciarButton,
            iniciarRondaTitulo: INICIAR_RONDA,
            titulo: 'Ronda Pausada!',
            rondaIniciada: false
        })

    }

    const concluirRonda = () => {
        if (!state.inicio) {
            // alert('Vai retornar aqui: ' + JSON.stringify(tempoRonda))
            return
        }

        const ronda = gerarRonda(idUsuario, state)

        // alert('concluindo ronda. Total coords=' + ronda.localizacoes.length)

        criarRonda(ronda, response => {
            let log = 'concluiu a criacao da ronda com sucesso. Valor do whatchid=' + state.watchID
            if (state.watchID !== null) {
                log += ' => concluindo e limpando WATCHID'
                Geolocation.clearWatch(state.watchID)
            }
            if (state.interval !== null) {
                log += '=> concluindo e limpando INTERVAL'
                clearInterval(state.interval)
            }
            // alert(log)
            setState({
                coordinates: [],
                titulo: 'Vamos Começar?',
                iniciarRondaStyle: styles.iniciarButton,
                iniciarRondaTitulo: INICIAR_RONDA,
                inicio: null,
                watchID: null,
                iniciarTempo: false,
                rondaIniciada: false
            })
            setTempoRonda(DEFAULT_TEMPO)
            setDistancia(0.00)
            props.navigation.navigate('homeVigia')
        },
            () => console.error('Erro ao concluir a ronda. Tente novamente!'))

    }

    return (
        <Container backgroundColor='white'>
            <Image
                style={styles.boxIcon}
                source={require('../../../images/check_branco_75.png')}
            />
            <Text style={styles.titulo}> {state.titulo}</Text>
            <View style={[styles.circulo, { marginBottom: 50 }]}>
                <View style={styles.circuloMenor}>
                    <Text style={[styles.textoMenor, { marginTop: 20 }]}>Tempo Ronda</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.tempoFormatado}>{tempoRonda.tempoFormatado}</Text>
                        <Text style={[styles.tempoFormatado, { fontSize: 25 }]}>: {tempoRonda.segundosFormatado}</Text>
                    </View>
                    <Text style={styles.textoMenor}>{distancia} km</Text>
                </View>

            </View>
            <TouchableButton title={state.iniciarRondaTitulo}
                style={state.iniciarRondaStyle}
                styleText={{ fontSize: 20, color: 'white', }}
                onPress={state.rondaIniciada ? pausarRonda : iniciarRonda}
            />
            <TouchableButton title='Concluir Ronda' style={styles.concluirButton}
                styleText={{ fontSize: 20 }}
                onPress={concluirRonda}
            />
        </Container>
    )
}
