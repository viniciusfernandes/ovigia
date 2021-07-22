import React from 'react'
import { Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import matisse from '../style/matisse'
import ImageBox from './ImageBox'


const styles = StyleSheet.create({
    contect: {
        width: '70%'
    },
    rightBar: {
        backgroundColor: matisse.laranja,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        width: '5%',
    },
})

export default props => {
    return (
        <ImageBox>
            <View style={ styles.contect}>{props.children}</View>
            <View style={styles.rightBar} />
        </ImageBox>
    )
}