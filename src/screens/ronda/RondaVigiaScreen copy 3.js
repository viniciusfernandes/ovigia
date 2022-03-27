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
import { useRef } from 'react/cjs/react.production.min';

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
                    detail: 'fine',
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


    // let fechar = !fechar ? state.modalLoadVisible : true
    const getPosition = async () => {
        const position = await RNLocation.getLatestLocation({ timeout: 100 })
        // console.info('position=' + position)
        if (position !== null) {
            const lastPosition = {
                latitude: position.latitude,
                longitude: position.longitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
                speed: position.speed
            }
            state.positions.push(lastPosition)
            //     setState({ ...state, modalLoadVisible: false })
            if (state.positions.length % 10 === 0) {
                alert('coords=' + state.positions.length + ' ' + new Date())
         //       setState({ ...state })

         this.refs.mapbox.myfunc
            }
        }
    }

    // console.info('ifechar=' + fechar)
    console.info('intercalo=' + state.interval)
    const iniciarRonda = () => {
        const interval = setInterval(getPosition, 2000);
        setState({
            ...state,
            rondaIniciada: true,
            dataInicioRonda: new Date(),
            interval: interval,
            modalLoadVisible: true
        })
    }

    const pausarRonda = () => {
        clearInterval(state.interval)
        setState({ ...state, rondaIniciada: false })
    }

    const encerrarRonda = () => {
        const ronda = {
            idVigia: idUsuario,
            localizacoes: state.positions,
            inicio: state.dataInicioRonda,
            fim: new Date()
        }
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
            props.navigation.
            
            navigate('homeVigia')
        })
    }
    
    return (
        <>
            <View style={styles.botoesContainer}>
                <TouchableButton style={styles.pausarButton} styleText={{ color: 'white', fontSize: 20 }}
                    title={state.rondaIniciada ? 'Pausar Ronda' : 'Iniciar Ronda'}
                    onPress={() => {
                        if (state.rondaIniciada) {
                            pausarRonda()
                        } else {
                            iniciarRonda()
                        }
                    }}
                />
                <TouchableButton style={styles.concluirButton} styleText={{ fontSize: 20 }}
                    title='Concluir Ronda' onPress={() => {
                        pausarRonda()
                        encerrarRonda()
                    }}
                />
            </View>
            <View style={styles.mapaContainer}>
                <MapBox id='rondaScreen' ref='mapbox' coordinates={state.positions.slice()} fullScreen drawLines {...this.props} />
                {/* <ConfirmacaoModalBox visible={state.modalVisible}
                    onClose={() => setState({ ...state, modalVisible: false })}
                    onConfirm={() => {
                        encerrarRonda()
                    }} /> */}
                {/* <LoadingModalBox visible={state.modalLoadVisible} message="LOCALIZANDO...!" /> */}
            </View>
        </>
    );
}