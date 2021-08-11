import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import matisse from '../style/matisse'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: matisse.laranja
    }
})
export default props => {
    const customStyle = props.backgroundColor ?
        [styles.container, { backgroundColor: props.backgroundColor }]
        : styles.container
    return (
        <SafeAreaView style={customStyle}>{props.children}</SafeAreaView>
    )
}