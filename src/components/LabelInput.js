import React, { useState } from 'react';
import {
    StyleSheet,
    Text, TextInput, View
} from 'react-native';
import matisse from '../style/matisse';

const styles = StyleSheet.create({
    container: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        paddingLeft: 20,
        borderRadius: 20,
        elevation: 3,
        width: '100%'
    },
    titulo: {
        color: matisse.cinzaEscuro,
        fontSize: 15,
        fontWeight: 'bold',
        //marginTop: 20,
        width: '100%'
    },

})

export default props => {
    let labelStyle = props.style !== undefined ? props.style.label : {}
    let inputStyle = props.style !== undefined ? props.style.input : {}
    const label = !props.hiddenLabel ? <Text style={[styles.titulo, labelStyle]}>{props.titulo}</Text> : null
    return (
        //<View style={[...styles.container, props.style]}>
        <View style={styles.container }>
            {label}
                <TextInput value={props.valor} style={[styles.input, inputStyle]} onChangeText={props.onChangeText} />
        </View>

    )
}