import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        padding: '2%',
        paddingTop: '2%',
        elevation: 5,
    },
    buttonText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default props => {
    return (
        <TouchableOpacity key={props.id} style={[styles.button, props.style]} onPress={props.onPress}>
            <Text style={[styles.buttonText, props.styleText]}>{props.title} </Text>
        </TouchableOpacity>
    )
}