import React, { useContext } from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import _BackgroundTimer from 'react-native-background-timer';
import MapBox from '../../components/MapBox';
import TouchableButton from '../../components/TouchableButton';
import AuthContext from '../../contexts/AuthContext';
import { criarRonda } from '../../services/ronda/ronda.service';
import matisse from '../../style/matisse';
import haversine from 'haversine';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';

const styles = StyleSheet.create({
    botoesContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: '70%',
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
    iniciarButton: {
        backgroundColor: matisse.verde,
        width: '45%'
    },
    pausarButton: {
        backgroundColor: matisse.laranjaAvermelhado,
        width: '45%'
    },
    concluirButton: {
        marginTop: '2%',
        width: '45%',
    },
    distanciaContainer: {
        backgroundColor: matisse.laranjaTransparente,
        borderRadius: 20,
        borderColor: matisse.laranja,
        borderWidth: 1,
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: '5%',
        paddingVertical: 10,
        textAlign: 'center',
        width: '80%',

    },
})
const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = 0.001;
const INICIAR_RONDA = 'Iniciar Ronda'
const PAUSAR_RONDA = 'Pausar Ronda'
export default props => {
    const { idUsuario } = useContext(AuthContext)
    const [state, setState] = useState({
        rondaIniciada: false,
        coordinates: [],
        modalVisible: false,
        modalLoadVisible: false,
        watchID: null,
        locationPermited: false,
        dataInicioRonda: null,
        distanceTravelled: 0.00,
        iniciarRondaStyle: styles.iniciarButton,
        iniciarRondaTitulo: INICIAR_RONDA
    })

    const calcDistance = (prevLatLng, newLatLng) => {
        return haversine(prevLatLng, newLatLng) || 0;
    }

    const iniciarRonda = () => {
        const { coordinate } = state;
        let watchID = Geolocation.watchPosition(
            position => {
                console.info(JSON.stringify(position))
                const { coordinates, distanceTravelled } = state;
                const newCoordinate = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    timestamp: position.timestamp,
                    velocidade: position.coords.speed
                };
                const prevCoordinate = coordinates.length <= 1 ? newCoordinate : coordinates[coordinates.length - 1]
                setState({
                    ...state,
                    idVigia: idUsuario,
                    dataInicioRonda: new Date(),
                    coordinates: coordinates.concat([newCoordinate]),
                    distanceTravelled:
                        distanceTravelled + calcDistance(prevCoordinate, newCoordinate),
                    prevLatLng: newCoordinate,
                    iniciarRondaStyle: styles.pausarButton,
                    iniciarRondaTitulo: PAUSAR_RONDA,
                    rondaIniciada: true
                });
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
            rondaIniciada: true,
            dataInicioRonda: new Date(),
            watchID: watchID,
            modalLoadVisible: true,
            watchID: watchID,
            iniciarRondaStyle: styles.pausarButton,
            iniciarRondaTitulo: PAUSAR_RONDA
        })
    }

    const pausarRonda = () => {
        Geolocation.clearWatch(state.watchID);
        setState({
            ...state, rondaIniciada: false, watchID: null,
            iniciarRondaStyle: styles.iniciarButton,
            iniciarRondaTitulo: INICIAR_RONDA
        })
    }

    const encerrarRonda = () => {
        const ronda = {
            idVigia: idUsuario,
            localizacoes: state.coordinates,
            inicio: state.dataInicioRonda,
            fim: new Date()
        }
        pausarRonda()
        criarRonda(ronda, response => {
            setState({
                rondaIniciada: false,
                coordinates: [],
                modalVisible: false,
                modalLoadVisible: false,
                watchID: null,
                locationPermited: true,
                dataInicioRonda: null,
                distanceTravelled: 0.00,
                iniciarRondaStyle: styles.iniciarButton,
                iniciarRondaTitulo: INICIAR_RONDA

            })
            props.navigation.navigate('homeVigia')
        })
    }
    return (
        <>

            <View style={styles.botoesContainer}>
                <TouchableButton style={state.iniciarRondaStyle} styleText={{ color: 'white', fontSize: 20 }}
                    title={state.iniciarRondaTitulo}
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

                <Text style={[styles.distanciaContainer, styles.bubble, styles.button]}>
                    {parseFloat(state.distanceTravelled).toFixed(2)} km
                </Text>



            </View>

            <View style={styles.mapaContainer}>
                <MapBox id='rondaScreen' coordinates={state.coordinates.slice()} fullScreen drawLines />
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