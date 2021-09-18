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
    fullMapaContainer: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    },
    fullMapa: {
        width: '100%',
        height: '100%',
    },

})

export default props => {
    const coordinates = props.coordinates
    var markers = []
    const startPosition = coordinates.length == 1 ? coordinates[0] : undefined
    const endPosition = coordinates[coordinates.length - 1]
    if (startPosition) {
        console.info('init marker position: ' + JSON.stringify(startPosition))
        markers.push(
            <Marker key='startMarker'
                coordinate={startPosition}
                title={'Você partiu daqui.'}
            />)
    }

    if (endPosition) {
        console.info('end marker position: ' + JSON.stringify(endPosition))
        markers.push(
            <Marker key='endMarker'
                coordinate={endPosition}
                title={'Você está aqui!'}
            />)
    }

    var polyline = null
    if (props.drawLines) {
        console.info('polyline: ' + true)

        polyline = <Polyline
            coordinates={coordinates}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={['#7F0000']}
            strokeWidth={2}
        />
    }
    const mapaContainerStyle = props.fullScreen ? styles.fullMapaContainer : styles.mapaContainer
    const mapaStyle = props.fullScreen ? styles.fullMapa : styles.mapa

    return (
        <View key={props.id} style={mapaContainerStyle}>
            <MapView style={mapaStyle} initialRegion={endPosition} region={endPosition}>
                {markers}
                {polyline}
            </MapView>
        </View>
    )
}