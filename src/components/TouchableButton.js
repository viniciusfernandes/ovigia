import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'


const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        borderRadius: 25,
        fontSize: 20,
        fontWeight: 'bold',
        padding: '2%',
        paddingTop: '2%',
        elevation: 5,

    },
    buttonText: {
        fontWeight: 'bold',
        marginTop: '5%',
        textAlign: 'center',
    },
})

export default props => {
    return (
        <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress}>
            <Text style={[styles.buttonText, props.styleText]}>{props.title} </Text>
        </TouchableOpacity>
    )
}