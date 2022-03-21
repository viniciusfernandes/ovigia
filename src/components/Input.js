import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderRadius: 20,
        color: 'black',
        elevation: 3,
        fontSize: 16,
        height: 30,
        padding: 0,
        paddingLeft: 20,
        width: '100%',

    }
})

export default props => {
    // return (
    //     props.currency !== undefined && props.currency !== null ?
    //         <CurrencyInput
    //             style={[styles.input, { height: 30 }, props.style]}
    //             value={props.valor}
    //             //  onChangeValue={value => props.onChangeText(value)}
    //             prefix='R$'
    //             delimiter='.'
    //             separator=','
    //             precision={2}
    //         //onChangeText={props.onChangeText}
    //         />
    //         : <TextInput secureTextEntry={props.secureTextEntry}
    //             value={props.value} style={[styles.input, props.style]}
    //             onChangeText={props.onChangeText} />
    // )
    return <TextInput secureTextEntry={props.secureTextEntry}
        value={props.value} style={[styles.input, props.style]}
        onChangeText={props.onChangeText} />
}