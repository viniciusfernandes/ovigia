import React from 'react'
import { Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import matisse from '../style/matisse'


const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 5,
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        height: 90

    },
    icon: {
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        height: 90,
        width: '25%',
        padding: 0
    },
    content: {
        height: '100%',
        width: '75%',
    }
})

export default props => {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.icon}>
                    <Image style={{ width: '55%', height: '55%', position: 'absolute', left: '25%', top: '25%' }} source={{
                        uri: props.imagem,
                    }} />
                </View>
              
                {props.children}
            </View>
        </TouchableOpacity>
    )
}