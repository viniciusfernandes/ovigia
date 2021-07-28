import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import matisse from '../style/matisse'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: matisse.laranja,
        alignItems: 'center'
    }
})
export default props => {
    return (
        <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>
    )
}