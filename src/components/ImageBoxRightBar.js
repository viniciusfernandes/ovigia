import React from 'react'
import { Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import matisse from '../style/matisse'
import ImageBox from './ImageBox'


const styles = StyleSheet.create({
    content: {
        width: '75%'
    },
    contentWithBar: {
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
    let content = null;
    if (props.showBar === undefined) {
        content = <>
            <View style={styles.content}>{props.children}</View>
        </>
    } else {
        content = <>
            <View style={styles.contentWithBar}>{props.children}</View>
            <View style={styles.rightBar} />
        </>
    }
    return (
        <ImageBox>
            {content}
        </ImageBox>
    )
}