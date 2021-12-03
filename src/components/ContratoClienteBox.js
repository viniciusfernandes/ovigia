import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import matisse from "../style/matisse";
import ImageBoxRightBar from "./ImageBoxRightBar";
import LabelInput from '../components/LabelInput'

const styles = StyleSheet.create({
    info: {
        color: 'white',
    },
    nomeCliente: {
        color: 'white',
        marginTop: 10,
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold'
    },
    confirmButton: {
        backgroundColor: matisse.laranja,
        marginTop: '5%'
    },

    cancelButton: {
        backgroundColor: matisse.laranjaAvermelhado,
        marginLeft: '5%',
        marginTop: '5%'
    },

})
export default props => {
    var contrato = props.contrato
    let dataBox = null;
    if (props.isVencimento) {
        dataBox =
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>Vencimento: </Text>
                <Text style={styles.info} >{contrato.dataVencimento}</Text>
            </View>
    } else {
        dataBox =
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>Data: </Text>
                <Text style={styles.info} >{contrato.data}</Text>
                <Text style={[styles.info, { marginLeft: '5%' }]} >{contrato.hora} (hs)</Text>
            </View>
    }
    return (
        <ImageBoxRightBar
            style={{ backgroundColor: matisse.laranja, height: 145 }}
            iconStyle={{ backgroundColor: matisse.cinzaClaro, height: 80 }}
            imagem={require('../../images/usuario_branco_75.png')}>
            <Text style={styles.nomeCliente}>{contrato.nomeCliente}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }} >Telefone: </Text>
                <Text style={styles.info}>{contrato.telefoneCliente}</Text>
            </View>

            {dataBox}

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, width: '100%' }}>
                <LabelInput style={{ width: '60%' }} titulo='Confirma o valor?'
                    labelStyle={{ fontSize: 15, color: 'white' }}
                    inputStyle={{ fontSize: 12, height: 30, paddingBottom: 0, paddingTop: 0 }}
                    onChangeText={props.onChangeValorContrato} />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ marginLeft: '10%' }} onPress={props.onConfirm}>
                        <Image source={require('../../images/check_branco_75.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: '5%' }} onPress={props.onCancel}>
                        <Image source={require('../../images/x_branco_75.png')} />
                    </TouchableOpacity>
                </View>

            </View>

        </ImageBoxRightBar>
    )
}