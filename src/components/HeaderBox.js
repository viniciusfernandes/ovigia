import React from "react"
import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({

    header: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: '5%',
        width: '100%'
    },

    textPequeno: {
        fontSize: 17,
        marginLeft: '10%',
        marginTop: '3%'
    }
})
export default props => {
    const headers = []
    var idHeader = 1

    const header = !!props.color ? { ...styles.header, color: props.color } : styles.header
    props.headers.forEach(message => {
        headers.push(<Text key={idHeader++} style={[header]}>{message}</Text>)
    });

    return (
        <View key={props.id} style={{ width: '100%', marginTop: '10%' }}>
            {headers}
            <Text style={[styles.header, styles.textPequeno]}>{props.detail}</Text>
        </View>
    )
}