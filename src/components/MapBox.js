import React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import matisse from "../style/matisse";
import geolocation from '@react-native-community/geolocation';
import { useEffect } from "react";
import _BackgroundTimer from "react-native-background-timer";

const styles = StyleSheet.create({
    mapaContainer: {
        alignItems: 'center',
        backgroundColor: matisse.cinzaTransparente,
        borderRadius: 20,
        elevation: 5,
        height: '30%',
        justifyContent: 'center',
        marginBottom: '2%',
        marginTop: '5%',
        width: '80%',

    },
    mapa: {
        width: '100%',
        height: '85%',
        overflow: 'hidden'
    },
})


function gerarCoordenates() {
    const coordinates = []
    var latitude = -23.70389
    var longitude = -46.61840
    const delta = 0.0001
    for (var i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            latitude += delta
        } else {
            longitude += delta
        }
        coordinates.push({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        })

        console.info(coordinates[i])
    }

    return coordinates
}

export default props => {
    var coordinates = gerarCoordenates()


    const [currentPosition, setCurrentPosition] = useState([{}])
    // const [coordinates, setCoordinates] = useState([])

    var latitude = -23.70389
    var longitude = -46.61840
    const delta = 0.0001


    _BackgroundTimer.setInterval(() => {
        latitude += delta
        longitude += delta
        var newCoordinates = []
        newCoordinates.push({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        })
        console.info('new cooredinates: ' + JSON.stringify(newCoordinates))
    }, 5000);

    const start = coordinates[0]
    const end = coordinates[coordinates.length - 1]


    geolocation.getCurrentPosition(
        position => {
            //  currentPosition=[{ latitude: position.latitude, longitude: position.longitude }]
            //setCurrentPosition([{ latitude: position.latitude, longitude: position.longitude }])
            console.info('position ' + JSON.stringify(currentPosition))
            coordinates[0] = currentPosition
        },
        error => Alert.alert(error.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )

    console.info('position 2 ' + JSON.stringify(currentPosition))
    return (
        <View key={props.id} style={styles.mapaContainer}>
            <MapView
                style={styles.mapa}
                region={coordinates[0]}
            >
                <Marker
                    coordinate={start}
                    title={'Você iniciou aqui!'}
                />
                <Marker
                    coordinate={end}
                    pinColor='green'
                    title={'Você está aqui!'}
                />
                <Polyline
                    coordinates={coordinates}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={['#7F0000']}
                    strokeWidth={2}
                />


            </MapView>
        </View>
    )
}