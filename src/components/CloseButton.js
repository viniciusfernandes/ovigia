import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
    container: {
        height: 10,
        position: 'absolute',
        right: '8%',
        top: '10%',
        width: 10,
    },
    icon: {
        height: '100%',
        width: '100%',
    },
})
export default props => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Image
                style={styles.icon}
                source={require('../../images/x_preto_75.png')}
            />
        </TouchableOpacity>
    )
}