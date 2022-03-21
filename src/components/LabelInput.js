import React from 'react';
import {
    StyleSheet,
    Text, View
} from 'react-native';
import matisse from '../style/matisse';
import Input from './Input';

const styles = StyleSheet.create({
    container: {
        width: '80%'
    },
    titulo: {
        color: matisse.cinzaEscuro,
        fontSize: 15,
        fontWeight: 'bold',
        width: '100%'
    },

})

export default props => {

    const label = !props.hiddenLabel ? <Text style={[styles.titulo, props.labelStyle]}>{props.titulo}</Text> : null

    return (
        <View style={[styles.container, props.style]}>
            {label}
            <Input value={props.valor} onChangeText={props.onChangeText} />
        </View>
    )
}