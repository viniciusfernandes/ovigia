import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import matisse from "../style/matisse";

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

export default props => {

    // geolocation.getCurrentPosition(
    //     position => {
    //          currentPosition=[{ latitude: position.latitude, longitude: position.longitude }]
    //         setCurrentPosition([{ latitude: position.latitude, longitude: position.longitude }])
    //         console.info('position ' + JSON.stringify(currentPosition))
    //         coordinates[0] = currentPosition
    //     },
    //     error => Alert.alert (error.message), { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // )
    const coordinates = props.coordinates
    var marcadores = []
    var startMarker = null
    var endMarker = null
    const endPosition = coordinates[coordinates.lenght - 1]
    if (startMarker) {
        marcadores.push(
            <Marker
                coordinate={startMarker.position}
                title={'Você partiu daqui.'}
            />)
    }

    if (endMarker) {
        marcadores.push(
            <Marker
                coordinate={endMarker.position}
                title={'Você está aqui!'}
            />)
    }

    var lines = null
    if (props.drawLines) {
        lines = <Polyline
            coordinates={props.coordinates}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={['#7F0000']}
            strokeWidth={2}
        />
    }
    return (
        <View key={props.id} style={styles.mapaContainer}>
            <MapView style={styles.mapa} region={endPosition}>
                {props.markers}
                {lines}
            </MapView>
        </View>
    )
}