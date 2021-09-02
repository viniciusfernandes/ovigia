
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default () => (
    <View style={styles.container}>
        <MapView
            style={styles.map}
            region={{
                latitude: -23.70389,
                longitude: -46.61829,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
        >
        </MapView>
    </View>
);