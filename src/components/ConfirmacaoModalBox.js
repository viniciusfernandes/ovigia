import React from 'react'
import { StyleSheet } from 'react-native'
import matisse from '../style/matisse'
import ModalBox from './ModalBox'
import TouchableButton from './TouchableButton'

const styles = StyleSheet.create({
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
    }
})

export default props => {
    return (
        <ModalBox visible={props.visible} message={'Confirma mesmo?'} onClose={props.onClose}>
            <TouchableButton title='Sim' style={styles.simButton}
                styleText={styles.simText} onPress={props.onConfirm} />
        </ModalBox>
    );
}