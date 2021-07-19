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
    return (
        <>
            <Text style={styles.titulo}>{props.titulo}</Text>
            <TextInput value={'xxxxxxxxx'} style={styles.input} />
        </>
    )
}