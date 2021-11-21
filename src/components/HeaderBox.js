import React from "react"
import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        // marginTop: '5%',
      //  alignItems:'flex-start',
        
    },
    header: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    textPequeno: {
        fontSize: 17,
        marginTop: '3%'
    }
})
export default props => {
    const headers = []
    var idHeader = 1
    props.headers.forEach(message => {
        headers.push(<Text key={idHeader++} style={[styles.header, { color: props.color }]}>{message}</Text>)
    });

    return (
        <View key={props.id} style={[styles.container, props.style]}>
            {headers}
            <Text style={[styles.header, styles.textPequeno, { color: props.color }]}>{props.detail}</Text>
        </View>
    )
}