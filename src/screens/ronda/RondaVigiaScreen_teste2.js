/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    PermissionsAndroid
} from "react-native";
import MapView, {
    Marker,
    AnimatedRegion,
    Polyline,
    PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
import Geolocation from "@react-native-community/geolocation";
import TouchableButton from "../../components/TouchableButton";
import matisse from "../../style/matisse";
import AuthContext from "../../contexts/AuthContext";
import { criarRonda } from "../../services/ronda/ronda.service";
import { useContext } from "react/cjs/react.production.min";

// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const INICIAR_RONDA = 'Iniciar Ronda'
const PAUSAR_RONDA = 'Pausar Ronda'

class AnimatedMarkers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            coordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            iniciarRondaStyle: styles.iniciarButton,
            iniciarRondaTitulo: INICIAR_RONDA
        };
        this.idUsuario

    }

    componentDidMount() {
        this.watchID = Geolocation.watchPosition(
            position => {
                const { coordinates, distanceTravelled } = this.state;
                const newCoordinate = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    timestamp: position.timestamp,
                    velocidade: position.coords.speed
                }

                console.warn('new coordinate=' + JSON.stringify(newCoordinate))
                this.setState({
                    coordinates: coordinates.concat([newCoordinate]),
                    distanceTravelled:
                        distanceTravelled + this.calcDistance(newCoordinate),
                    prevLatLng: newCoordinate,
                    iniciarRondaStyle: styles.pausarButton,
                    iniciarRondaTitulo: PAUSAR_RONDA,
                    inicio: new Date()
                })
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 1
            }
        )
        // this.setState({
        //     ...this.state,
        //     iniciarRondaStyle: styles.pausarButton,
        //     iniciarRondaTitulo: PAUSAR_RONDA,
        //     inicio: new Date()
        // })
    }

    iniciarRonda() {
        this.watchID = Geolocation.watchPosition(
            position => {
                const { coordinates, distanceTravelled } = this.state;
                const newCoordinate = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    timestamp: position.timestamp,
                    velocidade: position.coords.speed
                }

                console.warn('new coordinate=' + JSON.stringify(newCoordinate))
                this.setState({
                    coordinates: coordinates.concat([newCoordinate]),
                    distanceTravelled:
                        distanceTravelled + this.calcDistance(newCoordinate),
                    prevLatLng: newCoordinate,
                    iniciarRondaStyle: styles.pausarButton,
                    iniciarRondaTitulo: PAUSAR_RONDA,
                    inicio: new Date()
                })
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 1
            }
        )
        this.setState({
            ...this.state,
            iniciarRondaStyle: styles.pausarButton,
            iniciarRondaTitulo: PAUSAR_RONDA,
            inicio: new Date()
        })
    }

    concluirRonda() {
        if (this.state.watchID !== null) {
            const { idUsuario } = useContext(AuthContext)
            console.info(JSON.stringify('xx=' + idUsuario))
            const ronda = {
                idVigia: '',
                localizacoes: this.state.coordinates,
                inicio: this.state.inicio,
                fim: new Date()
            }
            criarRonda(ronda, response => {
                Geolocation.clearWatch(state.watchID)
                this.setState({
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    coordinates: [],
                    distanceTravelled: 0.00,
                    prevLatLng: null,
                    iniciarRondaStyle: styles.iniciarButton,
                    iniciarRondaTitulo: INICIAR_RONDA
                })
                props.navigation.navigate('homeVigia')
            })


        }
    }

    componentWillUnmount() {
        //    Geolocation.clearWatch(this.watchID);
    }

    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });

    calcDistance = newLatLng => {
        const { prevLatLng } = this.state;
        const dist = haversine(prevLatLng, newLatLng) || 0;
        console.warn('distance '+dist)
        return dist
    };


    startPosition = () => {
        if (this.state.coordinates.length <= 0) {
            return ({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: 0,
                longitudeDelta: 0
            })
        }
        return this.state.coordinates[0]
    }

    endPosition = () => {
        if (this.state.coordinates.length <= 0) {
            return ({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: 0,
                longitudeDelta: 0
            })
        }
        return this.state.coordinates[this.state.coordinates.length - 1]
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    showUserLocation
                    followUserLocation
                    loadingEnabled
                    region={this.getMapRegion()}
                >
                    <Polyline coordinates={this.state.coordinates} strokeWidth={5} />
                    <Marker.Animated
                        key='start'
                        pinColor={'yellow'}
                        coordinate={this.startPosition()}
                    />
                    <Marker.Animated
                        key='end'
                        coordinate={this.endPosition()}
                        title={'Aqi!!!'}
                    />
                </MapView>
                <View style={styles.buttonContainer}>
                    <TouchableButton style={this.state.iniciarRondaStyle} styleText={{ color: 'white', fontSize: 20 }}
                        title={this.state.iniciarRondaTitulo}
                        onPress={() => {
                            if (this.state.rondaIniciada) {
                                this.pausarRonda()
                            } else {
                                this.iniciarRonda()
                            }
                        }}
                    />
                    <TouchableButton style={styles.concluirButton} styleText={{ fontSize: 20 }}
                        title='Concluir Ronda' onPress={() => {
                            //  pausarRonda()
                            this.concluirRonda()
                        }}
                    />
                    <TouchableOpacity style={[styles.button]}  >
                        <Text style={styles.bottomBarContent}>
                            {parseFloat(this.state.distanceTravelled).toFixed(2)} km
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    latlng: {
        width: 200,
        alignItems: "stretch"
    },
    button: {
        // width: '80%',
        alignItems: "center",

        backgroundColor: "rgba(255,255,255,0.7)",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20
    },
    buttonContainer: {
        //flexDirection: "row",
        marginVertical: 20,
        width: '80%'
    },
    concluirButton: {
        marginTop: '2%',
        // width: '80%',
    },
    iniciarButton: {
        backgroundColor: matisse.verde,
        //width: '45%'
    },
    pausarButton: {
        backgroundColor: matisse.laranjaAvermelhado,
        //  width: '45%'
    },
});

export default AnimatedMarkers;
