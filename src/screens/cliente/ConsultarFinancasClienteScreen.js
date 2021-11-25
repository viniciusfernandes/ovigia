import { useFocusEffect } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react/cjs/react.development";
import Container from "../../components/Container";
import HeaderBox from "../../components/HeaderBox";
import VigiaRatingBox from "../../components/VigiaRatingBox";
import AuthContext from "../../contexts/AuthContext";
import { obterContratoAtivoCliente } from "../../services/contrato/contrato.services";
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
    }
})
export default props => {
    const vigia = {
        nome: 'Renato Canuto',
        rate: 3.46,
        cidade: 'São Paulo',
        dataInicio: '12/12/2020'
    }
    const [contratoAtivo, setContratoAtivo] = useState({})
    const { idUsuario } = useContext(AuthContext)
    useFocusEffect(
        React.useCallback(() => {
            obterContratoAtivoCliente(
                idUsuario, contrato => {
                    console.info(JSON.stringify(contrato))
                    const contratoAtivo = {
                        idContrato: contrato.id,
                        vigia: {
                            idVigia: contrato.idVigia,
                            nome: contrato.nomeVigia,
                            avaliacao: contrato.avaliacaoVigia,
                            valor: contrato.valor,
                            dataInicio: contrato.dataInicio,
                            telefone: contrato.telefoneVigia,
                        },
                        dataVencimento: contrato.dataVencimento, isVencido: contrato.isVencido
                    }
                    setContratoAtivo(contratoAtivo)
                })
        }, [])
    )
    return (
        <Container backgroundColor='white' >
            <HeaderBox color='black' headers={['Suas finanças', 'na palma da mão.']} />
            <VigiaRatingBox
                icon={require('../../../images/usuario_branco_75.png')}
                vigia={contratoAtivo.vigia}
                style={{ borderRadius: 0, elevation: 0 }}
                buttonTitle='Encerrar Contrato'
                onPress={() => { console.info('Encerrou a contratacao') }} />

            <View style={{ backgroundColor: matisse.cinzaClaro, height: 2, marginBottom: '10%', marginTop: '10%', width: '80%' }} />
            <View style={styles.vencimentoContainer}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }} >Pagamento</Text>
                <Text style={contratoAtivo.isVencido ? styles.textAtrasado : styles.textEmDia}>Você está em {contratoAtivo.isVencido ? 'atraso' : 'dia'}!</Text>
                <Text style={contratoAtivo.isVencido ? styles.textAtrasado : styles.textEmDia}>O vencimento  {contratoAtivo.isVencido ? 'foi' : 'será'} {contratoAtivo.dataVencimento}</Text>
            </View>

        </Container>
    )
}