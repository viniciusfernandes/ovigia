import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import matisse from "../style/matisse";
import ImageBoxRightBar from "./ImageBoxRightBar";
import Input from "./Input";

const styles = StyleSheet.create({
    info: {
        color: 'white',
    },
    nomeCliente: {
        color: 'white',
        marginTop: 5,
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
    }
})
export default props => {
    let contrato = props.contrato
    const [valorContrato, setValorContrato] = useState(contrato && contrato.valor ? '' + contrato.valor : '0.0')
    return (
        <ImageBoxRightBar
            style={{ backgroundColor: contrato.dataVencimento !== null ? matisse.laranja : matisse.verde, height: 145 }}
            iconStyle={{ backgroundColor: matisse.cinzaClaro, height: 80 }}
            imagem={require('../../images/usuario_branco_75.png')}>
            <Text style={styles.nomeCliente}>{contrato.nomeCliente}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }} >Telefone: </Text>
                <Text style={styles.info}>{contrato.telefoneCliente}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>Vencimento: </Text>
                <Text style={styles.info} >{contrato.dataVencimento}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, width: '100%' }}>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', color: 'white', marginBottom: 5 }}>Confirma o valor do contrato?</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Input currency style={{ width: '40%' }} value={valorContrato} onChangeText={valor => {
                    setValorContrato(valor)
                    props.onChangeValorContrato(valor)
                }} />
                <TouchableOpacity style={{ marginLeft: '10%' }} onPress={props.onConfirm}>
                    <Image source={require('../../images/check_branco_75.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: '5%' }} onPress={props.onCancel}>
                    <Image source={require('../../images/x_branco_75.png')} />
                </TouchableOpacity>
            </View>

        </ImageBoxRightBar>
    )
}