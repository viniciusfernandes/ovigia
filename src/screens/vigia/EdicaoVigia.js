import React from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity, View,
    Dimensions
} from 'react-native';
import EdicaoPerfil from '../EdicaoPerfil';
import LabelInput from '../../components/LabelInput'
import ImagemPerfil from '../../screens/ImagemPerfil';
import matisse from '../../style/matisse';

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    nome: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
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
    botaoSalvarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '15%',
    },
    botaoSalvar: {
        backgroundColor: matisse.laranja,
        borderRadius: 20,
        color: 'white',
        elevation: 5,
        height: 40,
        paddingTop: 5,
        textAlign: 'center',
        width: width / 2,
    }
})

export default props => {
    return (
        <EdicaoPerfil >
            <ImagemPerfil />
            <LabelInput style={{ label: { marginTop: '2%' } }} titulo={'E-mail'} />
            <LabelInput titulo={'Celular'} />
            <LabelInput titulo={'Senha'} />
            <TouchableOpacity style={styles.botaoSalvarContainer}>
                <Text style={[styles.label, styles.botaoSalvar]}>Salvar</Text>
            </TouchableOpacity>
        </EdicaoPerfil >
    )
}