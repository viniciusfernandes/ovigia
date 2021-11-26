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
        color: 'white',
        width: '100%',
    },
    rondaTitulo: {
        color: 'white',
        marginTop: 10,
        width: '100%',
        fontSize: 15,
        fontWeight: 'bold'
    },
    dataHora: {
        backgroundColor: 'white',
        borderRadius: 5,
        color: matisse.laranja,
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingRight: 5,
    },
})
export default props => {
    const vigia = {
        nome: 'Renato Canuto',
        rate: 3.46,
        cidade: 'São Paulo',
        dataInicio: '12/12/2020'
    }
    const [contratoAtivo, setContratoAtivo] = useState({})
    const { idUsuario, nomeUsuario } = useContext(AuthContext)
    useFocusEffect(
        React.useCallback(() => {
            obterContratoAtivoCliente(
                idUsuario, contrato => {
                    console.info(JSON.stringify(contrato))
                    const contratoAtivo = {
                        id: contrato.id,
                        vigia: {
                            id: contrato.idVigia,
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
            <HeaderBox color='black' headers={[`Olá, ${nomeUsuario}.`, 'Aqui você está seguro!']} />
            <ImageBoxRightBar
                style={{ backgroundColor: matisse.laranja, marginBottom: '5%' }}
                imagem={require('../../../images/escudocheck_branco_75.png')}>
                <Text style={styles.rondaTitulo}>Sua casa está segura!</Text>
                <Text style={styles.rondaDescricao}>Seu vigia constatou que está tudo bem.</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.dataHora} >Total Vigiado:</Text>
                    <Text style={[styles.dataHora, { marginLeft: 15 }]} >12</Text>
                </View>

            </ImageBoxRightBar>

            <VigiaRatingBox
                icon={require('../../../images/usuario_branco_75.png')}
                vigia={contratoAtivo.vigia}
                style={{ borderRadius: 0, elevation: 0 }}
                buttonTitle='Encerrar Contrato'
                onPress={() => cancelarContrato(contratoAtivo.id, () => setContratoAtivo({}))} />

            <View style={{ backgroundColor: matisse.cinzaClaro, height: 2, marginBottom: '10%', marginTop: '10%', width: '80%' }} />
            <View style={styles.vencimentoContainer}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }} >Pagamento</Text>
                <Text style={contratoAtivo.isVencido ? styles.textAtrasado : styles.textEmDia}>Você está em {contratoAtivo.isVencido ? 'atraso' : 'dia'}!</Text>
                <Text style={contratoAtivo.isVencido ? styles.textAtrasado : styles.textEmDia}>O vencimento  {contratoAtivo.isVencido ? 'foi' : 'será'} {contratoAtivo.dataVencimento}</Text>
            </View>

        </Container>
    )
}