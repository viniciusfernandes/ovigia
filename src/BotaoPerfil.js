import React from 'react'
import { Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native'

const laranja = '#F38223'

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
    description: {
        backgroundColor: 'white',
        width: '70%'
    },
    rightBar: {
        backgroundColor: laranja,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        width: '5%',
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 5,
        marginTop: 20,
    },
    mensagem: {
        color: '#C3C9C9',
        marginLeft: 5,
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
                <View style={styles.description}>
                    <Text style={styles.titulo}>{props.titulo}</Text>
                    <Text style={styles.mensagem}>{props.mensagem}</Text>

                </View>
                <View style={styles.rightBar} >

                </View>
            </View>
        </TouchableOpacity>
    )
}