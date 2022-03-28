import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import matisse from "../style/matisse";

const styles = StyleSheet.create({

    mapaContainer: {
        alignItems: 'center',
        backgroundColor: matisse.cinzaTransparente,
        borderColor: 'white',
        borderRadius: 20,
        borderStyle: 'solid',
        borderWidth: 4,
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
export const DEFAULT_POSITION = {
    latitude: -15.776504058160794,
    longitude: -47.88922546579417,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
}

export default props => {
    const coordinates = props.coordinates !== undefined && props.coordinates.length > 0 ? props.coordinates : [DEFAULT_POSITION]
    const startPosition = coordinates[0]
    const endPosition = coordinates[coordinates.length - 1]

    const containerStyle = props.fullScreen ? styles.fullMapaContainer : styles.mapaContainer
    const mapaStyle = props.fullScreen ? styles.fullMapa : styles.mapa
    const pinTitle = props.titlePin ? props.titlePin : 'Você partiu daqui.'
    return (
        <View key={props.id} style={[containerStyle, props.style]}>
            <MapView provider={'google'}
                showUserLocation
                followUserLocation
                loadingEnabled 
                style={mapaStyle}
                initialRegion={endPosition}
                region={endPosition} >
                <Marker key='startMarker'
                    coordinate={startPosition}
                    pinColor={'yellow'}
                    title={pinTitle}
                />
                <Marker key='endMarker'

                    coordinate={endPosition}
                    title={'Você está aqui!'}
                />
                <Polyline
                    coordinates={coordinates}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeColors={['#7F0000']}
                    strokeWidth={5}
                />
            </MapView>
        </View>
    )
}