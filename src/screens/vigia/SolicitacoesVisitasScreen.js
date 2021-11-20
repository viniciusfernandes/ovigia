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
import ContratoClienteBox from "../../components/ContratoClienteBox";

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

const gerarSolicitacaoBoxes = (contratos, idVigia, removerSolicitacaoBox) => {
    return contratos.map(contrato =>
        <ContratoClienteBox key={contrato.idCliente}
            contrato={contrato}
            confirmacao={'Fechar Contrato?'}
            onConfirm={() => criarContrato({
                idCliente: contrato.idCliente,
                nomeCliente: contrato.nomeCliente,
                telefoneCliente: contrato.telefoneCliente,
                idVigia: idVigia,
                valor: 11.62
            }, () => console.info('Criou o contato cliente: ' + contrato.idCliente))}
            onCancel={() => {
                removerSolicitacaoVisita(contrato.idCliente, () => removerSolicitacaoBox(contrato.idCliente))
            }}
        />
    )
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