import React, { useState } from 'react';
import {
    StyleSheet,
    Text, TextInput
} from 'react-native';
import matisse from '../style/matisse';

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        height: 40,
        paddingLeft: 20,
        borderRadius: 20,
        elevation: 3,
        width: '80%'
    },
    titulo: {
        color: matisse.cinzaEscuro,
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 20,
        width: '80%'
    },

})

export default props => {
    let labelStyle = props.style !== undefined ? props.style.label : {}
    let inputStyle = props.style !== undefined ? props.style.input : {}
    return (
        <>
            <Text style={[styles.titulo, labelStyle]}>{props.titulo}</Text>
            <TextInput value={props.valor} style={[styles.input, inputStyle]} onChangeText={props.onChangeText} />
        </>
    )
}