import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
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
    return (
        <View key={props.id} style={styles.mapaContainer}>
            <MapView
                style={styles.mapa}
                region={{
                    latitude: -23.70389,
                    longitude: -46.61829,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: -23.70389,
                        longitude: -46.61829,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02
                    }}
                    pinColor={"white"}
                    title={'Você está aqui!'}
                />
            </MapView>
        </View>
    )
}