import React from 'react';
import {
    StyleSheet,
    Text, TextInput, TouchableOpacity, View,
    Image, Dimensions
} from 'react-native';
import LabelInput from './LabelInput';
import matisse from './style/matisse';

const laranja = '#F38223'
const width = Dimensions.get('window').width
const diameter = 150
const borda = 5
const diameterMenor = diameter - 2 * borda
const radius = diameter / 2 + borda
const radiusMenor = radius - borda
const init = (width - diameter) / 2
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: laranja,
    },
    formulario: {
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
        marginTop: 180,
        paddingTop: 100,
        elevation: 5,
        width: width,
        alignContent: 'center'
    },
    nome: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 20,
        borderRadius: 20,
        elevation: 3
    },
    label: {
        color: '#C3C9C9',
        fontSize: 20,
        marginBottom: 0,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titulo: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 30
    },
    botao: {
        alignContent: 'center',
        borderRadius: 25,
        width: 200,
        marginTop: 50,
        padding: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
        elevation: 25,
    },
    logo: {
        width: 100,
        height: 100,
    },
    socialLogo: {
        width: 40,
        height: 40,
    },
})

export default props => {
    return (

        <View style={styles.formulario}>
            {props.children}
        </View>

    )
}