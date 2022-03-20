import React, { useState, useContext } from "react";
import { StyleSheet, Text } from "react-native";
import Container from "../../components/Container";
import HeaderBox from "../../components/HeaderBox";
import AuthContext from "../../contexts/AuthContext";
import matisse from "../../style/matisse";
import { obterSolicitacoesVisitas, removerSolicitacaoVisita } from "../../services/solicitacaoVisita/solicitacao.visita.services"
import { useFocusEffect } from "@react-navigation/core";
import { cancelarContrato, criarContrato, obterContratosAtivosVigia } from "../../services/contrato/contrato.services";
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
    let encontrouClienteNovo = false
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

    const gerarContratosBoxes = contratosAtivos => {
        contratosBoxes = contratosAtivos.map(contrato => {
            if (contrato.dataVencimento === null) {
                encontrouClienteNovo = true
            }
            console.info("hasClienteNovo=" + encontrouClienteNovo + ' => ' + new Date())
            return (<ContratoClienteBox key={contrato.idCliente}
                contrato={contrato}
                confirmacao={'Cancelar Contrato?'}
                onChangeValorContrato={valor => { contrato = { ...contrato, valor } }}
                onConfirm={() => criarContrato({ ...contrato, idVigia: idUsuario }, () => removerContrato(contrato))}
                onCancel={() =>
                    cancelarContrato(contrato.id, () => removerContrato(contrato))
                }
            />)
        }
        )
        setContratos(contratosBoxes)
    }

    useFocusEffect(
        React.useCallback(() => {
            obterContratosAtivosVigia(idUsuario, contratos => {
                gerarContratosBoxes(contratos)
                if (encontrouClienteNovo) {
                    mensagemContratoNovo = <Text style={styles.mensagemContratoNovo}>Maravilha, você tem um cliente novo!</Text>
                }
            }
            )
        }, [])
    );

    return (
        <Container backgroundColor='white' >
            <HeaderBox headers={['Tudo sobre seus clientes']} detail='Contratos dos Clientes' color='black' />
            {mensagemContratoNovo}
            <Text style={styles.mensagemContratoNovo}>Maravilha, você tem um cliente novo!</Text>
            {contratos}
        </Container>
    )
}