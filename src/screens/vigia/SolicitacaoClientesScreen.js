import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Container from "../../components/Container";
import HeaderBox from "../../components/HeaderBox";
import ImageBoxRightBar from "../../components/ImageBoxRightBar";
import TouchableButton from "../../components/TouchableButton";
import matisse from "../../style/matisse";

const styles = StyleSheet.create({
    info: {
        color: 'white',
    },
    header: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: '5%',
        width: '100%'
    },
    nomeCliente: {
        color: 'white',
        marginTop: 10,
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold'
    },
    aceitarButton: {
        backgroundColor: matisse.laranja,
        marginTop: '5%'
    },

    cancelarButton: {
        backgroundColor: matisse.laranjaAvermelhado,
        marginLeft: '5%',
        marginTop: '5%'
    },
})
export default props => {
    const solicitacao = {
        nomeCliente: 'Vinicius Fernandes',
        localizacaoCliente: {},
        telefoneCliente: '99982-12345',
        data: '12/12/2014',
        hora: '12:12'
    }
    return (
        <Container backgroundColor='white' >
            <HeaderBox headers={['Tudo sobre seus', 'novos clientes.']} detail='Clientes para Visitar' color='black' />

            <ImageBoxRightBar
                style={{ backgroundColor: matisse.laranja, height: 125 }}
                iconStyle={{ backgroundColor: matisse.cinzaClaro, height: 80 }}
                imagem={require('../../../images/usuario_branco_75.png')}>
                <Text style={styles.nomeCliente}>{solicitacao.nomeCliente}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }} >Telefone: </Text>
                    <Text style={styles.info}>{solicitacao.telefoneCliente}</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Data: </Text>
                    <Text style={styles.info} >{solicitacao.data}</Text>
                    <Text style={[styles.info, { marginLeft: '5%' }]} >{solicitacao.hora} (hs)</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }} >Fechar Contrato?</Text>
                    <TouchableOpacity style={{ marginLeft: '10%' }} onPress={props.onPress}>
                        <Image source={require('../../../images/check_branco_75.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: '5%' }} onPress={props.onPress}>
                        <Image source={require('../../../images/x_branco_75.png')} />
                    </TouchableOpacity>

                </View>


            </ImageBoxRightBar>

        </Container>
    )
}