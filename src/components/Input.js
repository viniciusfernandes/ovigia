import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        color: 'black',
        height: 40,
        paddingLeft: 20,
        borderRadius: 20,
        elevation: 3,
        width: '100%'
    }
})

export default props => {
    return (
        <TextInput secureTextEntry={props.secureTextEntry}
            value={props.value} style={[styles.input, props.style]}
            onChangeText={props.onChangeText} />
    )
}