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
    PROVIDER_GOOGLE,
    MarkerAnimated
} from "react-native-maps";
import haversine from "haversine";
import Geolocation from "@react-native-community/geolocation";
import TouchableButton from "../../components/TouchableButton";
import matisse from "../../style/matisse";

// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = -23.68166;
const LONGITUDE = -46.62333;

class AnimatedMarkers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            idVigia: null,
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: 0,
                longitudeDelta: 0
            })
        };
    }

    iniciarRonda = () => {
        const idUsuario = 'asdf'//useContext(AuthContext)
        const { coordinate } = this.state;
        this.watchID = Geolocation.watchPosition(
            position => {
                const { routeCoordinates, distanceTravelled } = this.state;
                const { latitude, longitude } = position.coords;

                const newCoordinate = {
                    latitude,
                    longitude
                };


                if (Platform.OS === "android") {
                    // if (this.marker) {
                    //     this.marker._component.animateMarkerToCoordinate(
                    //         newCoordinate,
                    //         500
                    //     );
                    // }
                } else {
                    coordinate.timing(newCoordinate).start();
                }

                this.setState({
                    idVigia: idUsuario,
                    dataInicioRonda: new Date(),
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    routeCoordinates: routeCoordinates.concat([newCoordinate]),
                    distanceTravelled:
                        distanceTravelled + this.calcDistance(newCoordinate),
                    prevLatLng: newCoordinate
                });
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
                distanceFilter: 1
            }
        );
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchID);
    }

    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });

    calcDistance = newLatLng => {
        const { prevLatLng } = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    };

    encerrarRonda = () => {
        const ronda = {
            idVigia: this.state.idVigia,
            localizacoes: this.state.routeCoordinates,
            inicio: this.state.dataInicioRonda,
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
            //props.navigation. navigate('homeVigia')
            alert('criou a ronda ')
        })
    };

    render() {
        let startPosition
        let endPosition
        if (this.state.routeCoordinates.length === 0) {
            startPosition = this.getMapRegion()
            endPosition = startPosition

        } else {
            startPosition = this.state.routeCoordinates[0]
            endPosition = this.state.routeCoordinates[this.state.routeCoordinates.length - 1]
        }
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
                    <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
                    <Marker key='startMarker'
                        coordinate={startPosition}
                        pinColor={'yellow'}
                        title={'Inicious aqui.'}
                    />
                    <Marker key='endMarker'

                        coordinate={endPosition}
                        title={'Você está aqui!'}
                    />
                </MapView>
                <View style={styles.botoesContainer}>
                    <TouchableButton style={styles.pausarButton} styleText={{ color: 'white', fontSize: 20 }}
                        title={this.state.rondaIniciada ? 'Pausar Ronda' : 'Iniciar Ronda'}
                        onPress={() => {
                            if (this.state.rondaIniciada) {
                        this.        pausarRonda()
                            } else {
                                this.iniciarRonda()
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
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.bubble, styles.button]}>
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
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    bubble: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.7)",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20
    },
    latlng: {
        width: 200,
        alignItems: "stretch"
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: "center",
        marginHorizontal: 10
    },
    buttonContainer: {
        flexDirection: "row",
        marginVertical: 20,
        backgroundColor: "transparent"
    },
    botoesContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: '70%',
        width: '100%',
        zIndex: 1,
    },
    pausarButton: {
        backgroundColor: matisse.laranja,
        width: '45%'
    },
    concluirButton: {
        marginTop: '2%',
        width: '45%',
    },
});

export default AnimatedMarkers;
