import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext } from "react/cjs/react.development";
import Container from "../../components/Container";
import HeaderBox from "../../components/HeaderBox";
import ImageBoxRightBar from "../../components/ImageBoxRightBar";
import AuthContext from "../../contexts/AuthContext";
import matisse from "../../style/matisse";
import { obterSolicitacoesVisitas, removerSolicitacaoVisita } from "../../services/solicitacaoVisita/solicitacao.visita.services"
import { useFocusEffect } from "@react-navigation/core";
import { criarContrato } from "../../services/contrato/contrato.services";

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

const gerarSolicitacaoBoxes = (solicitacoes, idVigia, removerSolicitacaoBox) => {
    return solicitacoes.map(solicitacao =>
        <ImageBoxRightBar key={solicitacao.idCliente}
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
                <TouchableOpacity style={{ marginLeft: '10%' }} onPress={() => criarContrato({
                    idCliente: solicitacao.idCliente,
                    idVigia: idVigia,
                    valor: 0.0
                }, () => console.info('Criou o contato cliente: ' + solicitacao.idCliente))}>
                    <Image source={require('../../../images/check_branco_75.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: '5%' }} onPress={() => {
                    removerSolicitacaoVisita(solicitacao.idCliente, () => removerSolicitacaoBox(solicitacao.idCliente))
                }}>
                    <Image source={require('../../../images/x_branco_75.png')} />
                </TouchableOpacity>
            </View>
        </ImageBoxRightBar>)
}

export default props => {
    const { idUsuario } = useContext(AuthContext)
    const [solicitacoesBoxes, setSolicitacoesBoxes] = useState([])
    const removerSolicitacaoBox = keyToRemove => {
        console.info('boxes length: ' + JSON.stringify(solicitacoesBoxes))
        let boxes = solicitacoesBoxes.filter(box => {
            console.info('box key: ' + box.key + ' encontrou: ' + (box.key !== keyToRemove))
            return box.key !== keyToRemove
        })
        setSolicitacoesBoxes(boxes)
    }
    useFocusEffect(
        React.useCallback(() => {
            obterSolicitacoesVisitas(idUsuario, solicitacoes => {
                var boxes = gerarSolicitacaoBoxes(solicitacoes, idUsuario, removerSolicitacaoBox)
                setSolicitacoesBoxes(boxes)
            })

        }, [])
    )


    return (
        <Container backgroundColor='white' >
            <HeaderBox headers={['Tudo sobre seus', 'novos clientes.']} detail='Clientes para Visitar' color='black' />
            {solicitacoesBoxes}
        </Container>
    )
}