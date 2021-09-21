
import React from 'react';
import { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import _BackgroundTimer from 'react-native-background-timer';
import MapBox from '../../components/MapBox';
import TouchableButton from '../../components/TouchableButton';
import matisse from '../../style/matisse';
import RondaCoordinateSigleton from './RondaCoordinatesSigleton'

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
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 3,
        alignItems: 'center',
        width: '50%',
    },
    simButton: {
        backgroundColor: matisse.laranja,
        color: 'white',
        marginBottom: '10%',
        width: '50%'
    },
    simText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: '10%',
        marginTop: '10%',
        textAlign: 'center'
    }
});


export default props => {
    const [modalOpened, setModalOpened] = useState(false)
    const [state, setState] = useState({
        rondaIniciada: RondaCoordinateSigleton.rondaIniciada,
        coordinates: []
    })

    const iniciarRonda = () => {
        RondaCoordinateSigleton.iniciarRonda(coordinates => {
            setState({ ...state, coordinates })
        })
    }

    const pausarRonda = () => {
        RondaCoordinateSigleton.pausarRonda()
    }

    return (
        <>
            <View style={styles.botoesContainer}>
                <TouchableButton style={styles.pausarButton} styleText={{ color: 'white', fontSize: 20 }}
                    title={state.rondaIniciada ? 'Pausar Ronda' : 'Iniciar Ronda'}
                    onPress={() => {
                        if (state.rondaIniciada) {
                            pausarRonda()
                        } else {
                            iniciarRonda()
                        }
                    }}
                />
                <TouchableButton style={styles.concluirButton} styleText={{ fontSize: 20 }}
                    title='Concluir Ronda' onPress={() => {
                        pausarRonda()
                        setModalOpened(true)
                    }}
                />
            </View>
            <View style={styles.mapaContainer}>
                <MapBox id='rondaScreen' coordinates={[...state.coordinates]} fullScreen drawLines />
                <Modal
                    animationType='slide'
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