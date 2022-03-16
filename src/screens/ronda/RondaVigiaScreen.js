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

export default props => {
    const { idUsuario } = useContext(AuthContext)
    const [state, setState] = useState({
        rondaIniciada: false,
        positions: [],
        modalVisible: false,
        modalLoadVisible: false,
        interval: null,
        locationPermited: false,
        dataInicioRonda: null
    })
    console.info('interval=' + state.interval)

    if (!state.locationPermited) {
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
        setState({ ...state, locationPermited: locationPermited })
        if (!locationPermited) {
            alert('Permissão de acesso ao GPS negada')
        }
    }

    const getPosition = async () => {
        const position = await RNLocation.getLatestLocation({ timeout: 100 })
        const lastPosition = {
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
            speed: position.speed
        }
        state.positions.push(lastPosition)
    }


    const iniciarRonda = () => {
        const interval = setInterval(getPosition, 3000);
        setState({
            ...state,
            rondaIniciada: true,
            dataInicioRonda: new Date(),
            interval: interval,
        })
    }

    const pausarRonda = modalVisible => {
        clearInterval(state.interval)
        setState({ ...state, interval: null, rondaIniciada: false, modalVisible: modalVisible })
    }

    const encerrarRonda = () => {
        const ronda = {
            idVigia: idUsuario,
            localizacoes: state.positions,
            inicio: state.dataInicioRonda,
            fim: new Date()
        }
        pausarRonda(true)
        criarRonda(ronda, response => {
            setState({
                rondaIniciada: false,
                positions: [],
                modalVisible: false,
                modalLoadVisible: false,
                interval: null,
                locationPermited: true,
                dataInicioRonda: null
            })
            props.navigation.navigate('homeVigia')
        })
    }
    return (
        <>
            <View style={styles.botoesContainer}>
                <TouchableButton style={styles.pausarButton} styleText={{ color: 'white', fontSize: 20 }}
                    title={state.rondaIniciada ? 'Pausar Ronda' : 'Iniciar Ronda'}
                    onPress={() => {
                        if (state.rondaIniciada) {
                            pausarRonda(false)
                        } else {
                            iniciarRonda(false)
                        }
                    }}
                />
                <TouchableButton style={styles.concluirButton} styleText={{ fontSize: 20 }}
                    title='Concluir Ronda' onPress={() => {
                        pausarRonda(true)
                    }}
                />
            </View>
            <View style={styles.mapaContainer}>
                <MapBox id='rondaScreen' coordinates={state.positions.slice()} fullScreen drawLines />
                <ConfirmacaoModalBox visible={state.modalVisible}
                    onClose={() => setState({ ...state, modalVisible: false })}
                    onConfirm={() => {
                        encerrarRonda()
                    }} />
                <LoadingModalBox visible={state.modalLoadVisible} message="LOCALIZANDO...!" />
            </View>
        </>
    );
}