import { useFocusEffect } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react/cjs/react.development";
import AuthContext from "../../contexts/AuthContext";
import { obterContratoAtivoCliente } from "../../services/contrato/contrato.services";
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
    const [contrato, setContrato] = useState({})
    const { idUsuario } = useContext(AuthContext)

    useFocusEffect(
        React.useCallback(() => {
            obterContratoAtivoCliente(idUsuario, contrato => {
                    if (contrato != null) {
                        setContrato(contrato)
                    }
                })
        }, [])
    )
    const emptyContrato = contrato.dataVencimento === undefined
    return emptyContrato ? <HomeClienteSemContratoScreen /> :
        <HomeClienteComContratoScreen
            contrato={contrato}
            onCancelarContrato={
                () => setContrato({})
            } />
}