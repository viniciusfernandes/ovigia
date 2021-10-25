import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import {CloseButton} from './CloseButton'
import {TouchableButton} from './TouchableButton'
import matisse from '../style/matisse';


const styles = StyleSheet.create({
    container: {
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
    },

});



export default props => {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={props.modalOpened}
        >
            <View style={styles.container}>
                <View style={styles.modal}>
                    <Text style={styles.modalText}>Confirma mesmo?</Text>
                    <CloseButton onPress={props.onClose} />
                    <TouchableButton title='Sim' style={styles.simButton}
                        styleText={styles.simText} onPress={props.onConfirm} />
                </View>
            </View>
        </Modal>
    )
}