
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import TouchableButton from '../../components/TouchableButton';
import matisse from '../../style/matisse';
const styles = StyleSheet.create({
    botoesContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: '80%',
        width: '100%'
    },
    mapaContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapa: {
        borderRadius: 200,
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
});

export default () => (
    <View style={styles.mapaContainer}>
        <View style={styles.botoesContainer}>
            <TouchableButton style={styles.pausarButton} styleText={{ color: 'white', fontSize: 20 }}
                title="Pausar Ronda" />
            <TouchableButton style={styles.concluirButton} styleText={{ fontSize: 20 }}
                title="Concluir Ronda" />
        </View>
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
);