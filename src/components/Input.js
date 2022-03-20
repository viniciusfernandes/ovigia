import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        color: 'black',
        height: 40,
        paddingLeft: 20,
        borderRadius: 20,
        elevation: 3,
        width: '100%',
        padding:0
    }
})

export default props => {
    return (
        props.currency ?
            <CurrencyInput
                style={[styles.input, { height: 30 }, props.style]}
                value={props.valor}
              //  onChangeValue={value => props.onChangeText(value)}
                prefix='R$'
                delimiter='.'
                separator=','
                precision={2}
                //onChangeText={props.onChangeText}
            />
            : <TextInput secureTextEntry={props.secureTextEntry}
                value={props.value} style={[styles.input, props.style]}
                onChangeText={props.onChangeText} />
    )
}