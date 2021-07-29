import React from 'react';
import {
    StyleSheet,
    Text, TextInput
} from 'react-native';

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        height: 40,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 20,
        borderRadius: 20,
        elevation: 3
    },
    titulo: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 30,
        marginTop: 20
    },

})

export default props => {
    let labelStyle = props.style !== undefined ? props.style.label : {}
    let inputStyle = props.style !== undefined ? props.style.input : {}
    return (
        <>
            <Text style={[styles.titulo, labelStyle]}>{props.titulo}</Text>
            <TextInput value={'xxxxxxxxx'} style={[styles.input, inputStyle]} />
        </>
    )
}