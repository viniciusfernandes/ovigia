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
        marginTop: '6%'
    }
})
export default props => {
    const headers = []
    props.headers.forEach(message => {
        headers.push(<Text style={[styles.header]}>{message}</Text>)
    });
    return (
        <View style={{ width: '100%', marginTop: '10%' }}>
            {headers}
            <Text style={[styles.header, styles.textPequeno]}>{props.detail}</Text>
        </View>
    )
}