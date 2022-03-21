import React, { useState, useContext } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import Container from "../../components/Container";
import HeaderBox from "../../components/HeaderBox";
import AuthContext from "../../contexts/AuthContext";
import matisse from "../../style/matisse";
import { obterSolicitacoesVisitas, removerSolicitacaoVisita } from "../../services/solicitacaoVisita/solicitacao.visita.services"
import { useFocusEffect } from "@react-navigation/core";
import { atualizarValorContrato, cancelarContrato, criarContrato, obterContratosAtivosVigia } from "../../services/contrato/contrato.services";
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
    mensagemContratoNovo: {
        color: matisse.verdeClaro,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10
    }
})


export default () => {
    const { idUsuario } = useContext(AuthContext)
    const [contratos, setContratos] = useState([])

    let contratosBoxes
    let contratosNaoSelecionados
    let mensagemContratoNovo
    const removerContrato = contrato => {
        contratosNaoSelecionados = []
        for (let i = 0; i < contratosBoxes.length; i++) {
            if (contratosBoxes[i].key !== contrato.idCliente) {
                contratosNaoSelecionados.push(contratosBoxes[i])
            }
        }
        contratosBoxes = contratosNaoSelecionados
        setContratos(contratosBoxes)
    }

    const criarOuAlterarContrato = contrato => {
        if (contrato.id === null) {
            criarContrato({ ...contrato, idVigia: idUsuario }, () => obterTodosContratos())
        } else {
            atualizarValorContrato(contrato.id, contrato.valor)
        }
    }

    const gerarContratosBoxes = contratosAtivos => {
        let encontrouClienteNovo
        contratosBoxes = contratosAtivos.map(contrato => {
            console.info('contrato=' + JSON.stringify(contrato ))

            if (contrato.id === null) {
                encontrouClienteNovo = true
            }
            return (<ContratoClienteBox key={contrato.idCliente}
                contrato={contrato}
                confirmacao={'Cancelar Contrato?'}
                onChangeValorContrato={valor => { contrato = { ...contrato, valor } }}
                onConfirm={() => criarOuAlterarContrato(contrato)}
                onCancel={() =>
                    cancelarContrato(contrato.id, () => removerContrato(contrato))
                }
            />)
        }
        )
        setContratos(contratosBoxes)
        return encontrouClienteNovo
    }

    const obterTodosContratos = () => {
        obterContratosAtivosVigia(idUsuario, contratos => {
            const encontrouClienteNovo = gerarContratosBoxes(contratos)
            if (encontrouClienteNovo) {
                mensagemContratoNovo = <Text style={styles.mensagemContratoNovo}>Maravilha, você tem um cliente NOVO!</Text>
            }
        }
        )
    }

    useFocusEffect(
        React.useCallback(() => {
            obterTodosContratos()
        }, [])
    );

    return (
        <Container backgroundColor='white' >
            <HeaderBox headers={['Tudo sobre seus clientes']} detail='Contratos dos Clientes' color='black' />
            {mensagemContratoNovo}
            <ScrollView>
                {contratos}
            </ScrollView>

        </Container>
    )
}