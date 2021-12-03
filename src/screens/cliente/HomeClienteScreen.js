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
import HomeClienteComContratoScreen from "./HomeClienteComContratoScreen";
import HomeClienteSemContratoScreen from "./HomeClienteSemContratoScreen";

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
    const [contratoAtivo, setContratoAtivo] = useState({})
    const [vigia, setVigia] = useState({})
    const [frequenciaRonda, setFrequenciaRonda] = useState({})
    const { idUsuario, nomeUsuario } = useContext(AuthContext)

    useFocusEffect(
        React.useCallback(() => {
            obterContratoAtivoCliente(
                idUsuario, contrato => {
                    let vigia
                    if (contrato != null) {
                        setContratoAtivo(contrato)
                        vigia = {
                            id: contrato.idVigia,
                            nome: contrato.nomeVigia,
                            avaliacao: contrato.avaliacaoVigia,
                            valor: contrato.valor,
                            dataInicio: contrato.dataInicio,
                            telefone: contrato.telefoneVigia,
                        }
                    } else {
                        vigia = {
                            id: null,
                            nome: 'Seu vigia aparecerá aqui!',
                            avaliacao: 0.0,
                            valor: '0.00',
                            dataInicio: '',
                            telefone: '',
                        }
                    }
                    setVigia(vigia)
                })
        }, [])
    )
    const emptyContrato = contratoAtivo.dataVencimento === undefined
    return emptyContrato ? <HomeClienteSemContratoScreen /> :
        <HomeClienteComContratoScreen
            contrato={contratoAtivo}
            vigia={vigia}
            onCancelarContrato={
                () => setContratoAtivo({})
            } />
}