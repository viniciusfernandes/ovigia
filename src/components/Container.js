import React from 'react'
import { useContext } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import AuthContext from '../contexts/AuthContext'
import matisse from '../style/matisse'
import TouchableButton from './TouchableButton'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: matisse.laranja
    },
    perfil: {
        borderColor: 'white',
        borderRadius: 40,
        borderWidth: 2,
        height: '100%',
        width: '100%',
    },
    perfilcontainer: {
        height: 50,
        left: '85%',
        position: 'absolute',
        top: '2%',
        width: 50,
    },

})

export default props => {
    const customStyle = props.backgroundColor ?
        [styles.container, { backgroundColor: props.backgroundColor }]
        : styles.container

    const { singOut } = useContext(AuthContext)

    const profileButton = (
        <TouchableOpacity style={styles.perfilcontainer} onPress={() => singOut()}  >
            <Image style={styles.perfil} source={require('../../images/perfil-vinicius.jpg')} />
        </TouchableOpacity>
    )
    const profilePhoto = props.hideProfile === undefined ? profileButton : null
    return (
        <SafeAreaView style={customStyle}>
            {profilePhoto}
            {props.children}
        </SafeAreaView>
    )
}