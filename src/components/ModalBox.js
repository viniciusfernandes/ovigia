import React from 'react'
import {
    Modal,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import matisse from '../style/matisse'
import CloseButton from './CloseButton'

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        padding: '2%',
        paddingTop: '2%',
        elevation: 3,
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
})


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
})

export default props => {
    let closeButton
    if (props.onClose !== null && props.onClose !== undefined) {
        closeButton = <CloseButton onPress={props.onClose} />
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}>
            <View style={modalStyles.modalContainer}>
                <View style={[modalStyles.modal, props.style]}>
                    <Text style={[modalStyles.modalText, props.textStyle]}>{props.message}</Text>
                    {closeButton}
                    {props.children}
                </View>
            </View>
        </Modal>
    );
}