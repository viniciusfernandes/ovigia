import { useFocusEffect } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react/cjs/react.development";
import Container from "../../components/Container";
import HeaderBox from "../../components/HeaderBox";
import ImageBoxRightBar from "../../components/ImageBoxRightBar";
import VigiaRatingBox from "../../components/VigiaRatingBox";
import AuthContext from "../../contexts/AuthContext";
import { cancelarContrato } from "../../services/contrato/contrato.services";
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
    const contrato = props.contrato
    const vigia = props.vigia
    const [frequenciaRonda, setFrequenciaRonda] = useState({})
    const { idUsuario, nomeUsuario } = useContext(AuthContext)
    useFocusEffect(
        React.useCallback(() => {
            obterFrequenciaRonda(idUsuario, frequencia => setFrequenciaRonda(frequencia))
        }, [])
    )

    let pagamento;
    let mensagemRonda;
    if (frequenciaRonda.totalRonda > 1) {
        mensagemRonda = {
            titulo: 'Última Ronda: 12/12/2021',
            descricao: `A sua casa está segura pois o vigia ${"\n"} passou por aí ${frequenciaRonda.totalRonda} vezes nessa data.`
        }
    } else {
        mensagemRonda = {
            titulo: 'Última Ronda: 12/12/2021',
            descricao: 'Infelizmente o vigia não passou por aí nessa data. Veja com ele o que aconteceu!'
        }
    }


    if (!contrato.isVencido) {
        pagamento = {
            mensagem: 'Você está em atraso',
            vencimento: `O vencimento foi dia ${contrato.dataVencimento}.`,
            style: styles.textAtrasado
        }
    } else {
        pagamento = {
            mensagem: 'Você está em dia.',
            vencimento: `O vencimento será dia ${contrato.dataVencimento}.`,
            style: styles.textEmDia
        }
    }
    return (
        <Container backgroundColor='white' >
            <HeaderBox color='black' headers={[`Olá, ${nomeUsuario}.`, 'Aqui você está seguro!']} />
            <ImageBoxRightBar
                style={{ backgroundColor: 'white', borderColor: matisse.laranja, borderWidth: 2, marginBottom: '5%', height: 120 }}
                imagem={require('../../../images/escudocheck_laranja_75.png')}>
                <Text style={styles.rondaTitulo}>{mensagemRonda.titulo}</Text>
                <Text style={styles.rondaDescricao}>{mensagemRonda.descricao}</Text>


                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Text style={styles.totalVigiadoText} >Total Vigiado:</Text>
                    <Text style={[styles.totalVigiadoText]} >{frequenciaRonda.totalRonda}</Text>
                </View>

            </ImageBoxRightBar>

            <VigiaRatingBox
                icon={require('../../../images/usuario_branco_75.png')}
                vigia={vigia}
                style={{ borderRadius: 0, elevation: 0 }}
                buttonTitle='Cancelar Contrato'
                onPress={() => cancelarContrato(contrato.id, () => props.onCancelarContrato())} />

            <View style={{ backgroundColor: matisse.cinzaClaro, height: 2, marginBottom: '10%', marginTop: '10%', width: '80%' }} />
            <View style={styles.vencimentoContainer}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }} >Pagamento</Text>
                <Text style={pagamento.style}>{pagamento.mensagem}</Text>
                <Text style={pagamento.style}>{pagamento.vencimento}</Text>
            </View>

        </Container>
    )
}