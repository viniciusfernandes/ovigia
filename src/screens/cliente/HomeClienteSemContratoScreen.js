import { useFocusEffect } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react/cjs/react.development";
import Container from "../../components/Container";
import HeaderBox from "../../components/HeaderBox";
import ImageBoxRightBar from "../../components/ImageBoxRightBar";
import VigiaRatingBox from "../../components/VigiaRatingBox";
import AuthContext from "../../contexts/AuthContext";
import { cancelarContrato, obterContratoAtivoCliente } from "../../services/contrato/contrato.services";
import { obterFrequenciaRonda } from "../../services/ronda/ronda.service";
import matisse from "../../style/matisse";

const styles = StyleSheet.create({
    textPagamento: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    textAtrasado: {
        color: matisse.laranjaAvermelhado,
        fontSize: 20,
        fontWeight: 'bold',
    },
    textEmDia: {
        color: matisse.laranja,
        fontSize: 20,
        fontWeight: 'bold',
    },
    vencimentoContainer: {
        alignItems: 'flex-start'
    },
    rondaDescricao: {
        color: matisse.laranja,
        width: '100%',
    },
    rondaTitulo: {
        color: matisse.laranja,
        marginTop: 10,
        width: '100%',
        fontSize: 15,
        fontWeight: 'bold'
    },
    totalVigiadoText: {
        color: matisse.laranjaAvermelhado,
        fontWeight: 'bold',
        paddingRight: 5,
    },
})
export default props => {
    const { nomeUsuario } = useContext(AuthContext)
    const vigia = {
        id: null,
        nome: 'Seu vigia aparecerá aqui!',
        avaliacao: 0.0,
        valor: '0.00',
        dataInicio: '',
        telefone: '',
    }

    return (
        <Container backgroundColor='white' >
            <HeaderBox color='black' headers={[`Olá, ${nomeUsuario}.`, 'Busque os vigias mais', 'próximos no menu!']} />
            <VigiaRatingBox
                icon={require('../../../images/usuario_branco_75.png')}
                vigia={vigia}
                style={{ borderRadius: 0, elevation: 0 }}
                hideButton
            />

            <View style={{ backgroundColor: matisse.cinzaClaro, height: 2, marginBottom: '10%', marginTop: '10%', width: '80%' }} />
        </Container>
    )
}