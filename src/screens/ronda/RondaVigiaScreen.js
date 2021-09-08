
import React from 'react';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import TouchableButton from '../../components/TouchableButton';
import matisse from '../../style/matisse';
const styles = StyleSheet.create({
    botoesContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: '80%',
        width: '100%',
        zIndex: 1,
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

const modalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: "white",
        borderRadius: 20,
        elevation: 3,
        alignItems: "center",
        width: '50%',
    },
    simButton: {
        backgroundColor: matisse.laranja,
        color: 'white',
        marginBottom: '10%',
        width: '50%'
    },
    simText: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: '10%',
        marginTop: '10%',
        textAlign: "center"
    }
});


export default props => {
    const [modalOpened, setModalOpened] = useState(false)

    return (
        <>
            <View style={styles.botoesContainer}>
                <TouchableButton style={styles.pausarButton} styleText={{ color: 'white', fontSize: 20 }}
                    title="Pausar Ronda" />
                <TouchableButton style={styles.concluirButton} styleText={{ fontSize: 20 }}
                    title="Concluir Ronda" onPress={() => setModalOpened(true)}
                />
            </View>
            <View style={styles.mapaContainer}>

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

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalOpened}

                >
                    <View style={modalStyles.modalContainer}>
                        <View style={modalStyles.modal}>
                            <Text style={modalStyles.modalText}>Confirma mesmo?</Text>
                            <TouchableButton title='Sim' style={modalStyles.simButton}
                                styleText={modalStyles.simText} onPress={() => {
                                    setModalOpened(false)
                                    props.navigation.navigate('resumoRonda')
                                }
                                } />
                        </View>
                    </View>
                </Modal>

            </View>
        </>
    );
}