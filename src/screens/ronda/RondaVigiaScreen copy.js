import React, { useContext } from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import _BackgroundTimer from 'react-native-background-timer';
import MapBox from '../../components/MapBox';
import TouchableButton from '../../components/TouchableButton';
import AuthContext from '../../contexts/AuthContext';
import { criarRonda } from '../../services/ronda/ronda.service';
import matisse from '../../style/matisse';
import ConfirmacaoModalBox from '../../components/ConfirmacaoModalBox';
import LoadingModalBox from '../../components/LoadingModalBox';
import RNLocation from 'react-native-location';

const styles = StyleSheet.create({
    botoesContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: '80%',
        width: '100%',
        zIndex: 1,
    },
    mapaContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapa: {

        width: '100%',
        height: '100%',
    },
    pausarButton: {
        backgroundColor: matisse.laranja,
        width: '45%'
    },
    concluirButton: {
        marginTop: '2%',
        width: '45%',
    },
})

const STATUS_RONDA = {
    NAO_INICIADA: 'NAO_INICIADA',
    INICIADA: 'INICIADA',
    GEOLOCALIZACAO_INICIADA: 'GEOLOCALIZACAO_INICIADA',
    OBTENDO_GEOLOCALIZACAO: 'OBTENDO_GEOLOCALIZACAO',
    PAUSADA: 'PAUSADA',
    ENCERRADA: 'ENCERRADA',
    isIniciada: state => state === 'INICIADA',
    isPausada: state => state === 'PAUSADA',
    isNaoIniciada: state => state === 'NAO_INICIADA',
    isEncerrada: state => state === 'ENCERRADA',
    isGeolocalizacaoIniciada: state => state === 'GEOLOCALIZACAO_INICIADA',
    isObtendoGeolocalizacao: state => state === 'OBTENDO_GEOLOCALIZACAO'
}

export default props => {
    const { idUsuario } = useContext(AuthContext)
    const [state, setState] = useState({
        localizacoes: [],
        modalVisible: false,
        modalLoadVisible: false,
        interval: null,
        locationPermited: false,
        dataInicioRonda: null,
        statusRonda: STATUS_RONDA.NAO_INICIADA
    })

    const status = state.statusRonda
    console.info(status)
    if (STATUS_RONDA.isNaoIniciada(state)) {
        RNLocation.configure({
            distanceFilter: 5, // Meters
            desiredAccuracy: {
                ios: "best",
                android: "highAccuracy"
            },
            // Android only
            androidProvider: "auto",
            interval: 5000, // Milliseconds
            fastestInterval: 10000, // Milliseconds
            maxWaitTime: 5000, // Milliseconds

        })

        const requestPermissionLocation = async () => {
            return await RNLocation.requestPermission({
                ios: "whenInUse",
                android: {
                    detail: "coarse",
                    rationale: {
                        title: "We need to access your location",
                        message: "We use your location to show where you are on the map",
                        buttonPositive: "OK",
                        buttonNegative: "Cancel"
                    }
                }
            })
        }

        const locationPermited = requestPermissionLocation()
        if (!locationPermited) {
            alert('Permissão de acesso ao GPS negada')
        }
    }

    const fechar = STATUS_RONDA.isGeolocalizacaoIniciada(status) || STATUS_RONDA.isObtendoGeolocalizacao(status)
    console.info('fechar=' + fechar + ' COM O STATUS=' + state.statusRonda)
    const getPosition = async () => {
        return RNLocation.getLatestLocation({ timeout: 2000 }).then(position => {
            if (position !== null) {
                const lastPosition = {
                    latitude: position.latitude,
                    longitude: position.longitude,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002,
                    speed: position.speed
                }
                state.localizacoes.push(lastPosition)
            }
            return position
        })

    }

    const iniciarRonda = () => {
        setState({
            ...state,
            statusRonda: STATUS_RONDA.INICIADA,
            dataInicioRonda: new Date(),
            modalLoadVisible: true
        })

    }
    if (STATUS_RONDA.isIniciada(status)) {
        setState({ ...state, statusRonda: STATUS_RONDA.GEOLOCALIZACAO_INICIADA })
    } else if (STATUS_RONDA.isGeolocalizacaoIniciada(status)) {
        console.info('iniciando o intervalo ')
        interval = setInterval(() => {
            getPosition().then(position => {
                // console.info('fechando o modal=' + fechar + ' COM O STATUS=' + state.statusRonda)
                if (fechar) {
                    // console.info('fechando o modal=' + fechar + ' COM O STATUS=' + state.statusRonda)
                    setState({ ...state, modalLoadVisible: false, statusRonda: STATUS_RONDA.OBTENDO_GEOLOCALIZACAO, interval: interval })
                }
            })
        }, 6000);
        // setState({ ...state, interval: interval })
    }

    const pausarRonda = modalVisible => {
        clearInterval(state.interval)
        setState({
            ...state,
            interval: null,
            modalVisible: modalVisible,
            statusRonda: STATUS_RONDA.PAUSADA
        })
    }
    const interval = state.interval
    console.info('interval=' + interval)
    const encerrarRonda = () => {

        const ronda = {
            idVigia: idUsuario,
            localizacoes: state.localizacoes,
            inicio: state.dataInicioRonda,
            fim: new Date()
        }
        criarRonda(ronda, response => {
            console.info('limpando o interval=' + interval)
            clearInterval(interval)
            setState({
                localizacoes: [],
                modalVisible: false,
                modalLoadVisible: false,
                interval: null,
                locationPermited: true,
                dataInicioRonda: null,
                statusRonda: STATUS_RONDA.ENCERRADA
            })
            props.navigation.navigate('homeVigia')
        })
    }

    return (
        <>
            <View style={styles.botoesContainer}>
                <TouchableButton style={styles.pausarButton} styleText={{ color: 'white', fontSize: 20 }}
                    title={STATUS_RONDA.isPausada(status) || STATUS_RONDA.isNaoIniciada(status) ? 'Iniciar Ronda' : 'Pausar Ronda'}
                    onPress={() => {
                        if (STATUS_RONDA.isIniciada(status)) {
                            pausarRonda(false)
                        } else {
                            iniciarRonda(false)
                        }
                    }}
                />
                <TouchableButton style={styles.concluirButton} styleText={{ fontSize: 20 }}
                    title='Concluir Ronda' onPress={() => {
                        encerrarRonda()
                    }}
                />
            </View>
            <View style={styles.mapaContainer}>
                <MapBox id='rondaScreen' coordinates={state.localizacoes.slice()} fullScreen drawLines />
                {/* <ConfirmacaoModalBox visible={state.modalVisible}
                    onClose={() => setState({ ...state, modalVisible: false })}
                    onConfirm={() => {
                        encerrarRonda()
                    }} /> */}
                <LoadingModalBox visible={state.modalLoadVisible} message="LOCALIZANDO...!" />
            </View>
        </>
    );
}