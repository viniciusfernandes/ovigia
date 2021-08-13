import React from 'react'
import { StyleSheet } from 'react-native'
import { larguraPercentual } from '../../../constantes/medidas/Medidas'
import matisse from '../../../style/matisse'
const styles = StyleSheet.create({
    botaoLaranja: {
        backgroundColor: matisse.laranja,
        width: '40%',
    },
    botaoCinza: {
        backgroundColor: matisse.cinzaClaro,
        width: '40%',
    },
    botoesBar: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-around',
        marginTop: '30%',
        width: '100%'
    },
    box: {
        alignItems: 'center',
        borderRadius: 20,
        elevation: 3,
        height: larguraPercentual(40),
        justifyContent: 'center',
        padding: '5%',
        width: larguraPercentual(50),
    },
    boxVigia: {
        backgroundColor: matisse.laranja,
        marginBottom: '5%',
        marginTop: '5%',
    },
    boxCliente: {
        backgroundColor: matisse.cinzaClaro,
    },
    boxIcon: {
        flex: 1,
        width: '40%',
        resizeMode: 'contain',
    },
    textoTitulo: {
        fontSize: 35,
        fontWeight: 'bold',
        color: matisse.laranja,
        marginTop: '10%',
        marginBottom: '5%'
    },
    textoMenor: {
        color: matisse.cinzaEscuro,
        fontSize: 20,
    },
    tipoUsuario: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    textoBotao: {
        fontSize: 20
    },
    textoBotaoCinza: {
        color: matisse.cinzaEscuro
    },
    textoBotaoLaranja: {
        color: 'white'
    }
})
export default styles