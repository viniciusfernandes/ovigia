import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'
import { larguraPercentual } from '../constantes/medidas/Medidas'
import matisse from '../style/matisse'

const larguraIcon = larguraPercentual(15)

const styles = StyleSheet.create({
    content: {
        height: '100%',
        width: '75%',
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
    container: {
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 5,
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '5%',
        height: 90

    },
    icon: {
        borderRadius: 10,
        height: larguraIcon,
        marginLeft: '25%',
        marginTop: '25%',
        width: larguraIcon,
    },
    imagem: {
        height: '100%',
        width: '25%',
        padding: 0
    },


})

export default props => {
    let content = null;
    if (props.showBar === undefined) {
        content =
            <>
                <View style={styles.content}>{props.children}</View>
            </>
    } else {
        content =
            <>
                <View style={styles.contentWithBar}>{props.children}</View>
                <View style={styles.rightBar} />
            </>
    }

    return (
        <TouchableOpacity key={props.id} style={[styles.container, props.style]} onPress={props.onPress}>
            <View style={styles.imagem}>
                <Image style={[styles.icon, props.iconStyle]} source={props.imagem} />
            </View>
            {content}
        </TouchableOpacity>
    )
}