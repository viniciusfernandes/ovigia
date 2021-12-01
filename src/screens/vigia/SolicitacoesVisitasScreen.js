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


export default props => {
    const { idUsuario } = useContext(AuthContext)
    const [solicitacoesBoxes, setSolicitacoesBoxes] = useState([])

    const gerarSolicitacaoBoxes = solicitacoes => {
        let boxesNaoSelecionados = []
        let boxes = solicitacoes.map(solicitacao =>
            <ContratoClienteBox key={solicitacao.idCliente}
                contrato={solicitacao}
                confirmacao={'Fechar Contrato?'}

                onConfirm={() => criarContrato({ ...solicitacao, idVigia: idUsuario }, () => {
                    boxesNaoSelecionados = []
                    for (let i = 0; i < boxes.length; i++) {
                        if (boxes[i].key !== solicitacao.id) {
                            boxesNaoSelecionados.push(boxes[i])
                        }
                    }
                    setSolicitacoesBoxes(boxesNaoSelecionados)
                })}
                onCancel={() => {
                    removerSolicitacaoVisita(solicitacao.idCliente, () => removerSolicitacaoBox(solicitacao.idCliente))
                }}
            />
        )
        setSolicitacoesBoxes(boxes)
    }

    useFocusEffect(
        React.useCallback(() => {
            obterSolicitacoesVisitas(idUsuario, solicitacoes => {
                gerarSolicitacaoBoxes(solicitacoes)
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