import { useFocusEffect } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react/cjs/react.development";
import Container from "../../components/Container";
import HeaderBox from "../../components/HeaderBox";
import ImageBoxRightBar from "../../components/ImageBoxRightBar";
import ModalBox from "../../components/ConfirmacaoModalBox";
import TouchableButton from "../../components/TouchableButton";
import VigiaRatingBox from "../../components/VigiaRatingBox";
import AuthContext from "../../contexts/AuthContext";
import { cancelarChamado, criarChamado, obterChamadoAtivoCliente } from "../../services/chamado/chamado.service";
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
        marginBottom: '2%'
    },
    rondaTitulo: {
        color: matisse.laranja,
        marginTop: 10,
        width: '100%',
        fontSize: 15,
        fontWeight: 'bold'
    },
    botaoChamadoContainer: {
        alignItems: 'center',
        width: '100%',
    },
    totalVigiadoText: {
        color: matisse.laranjaAvermelhado,
        fontWeight: 'bold',
        paddingRight: 5,
    },
    chamadoButton: {
        height: 30,
        width: '70%',
    },
    chamadoTextButton: {
        color: 'white',
        fontSize: 15
    }, button: {
        backgroundColor: matisse.laranja,
        marginTop: '5%'
    },
})
export default props => {
    const contrato = props.contrato
    const vigia = {
        id: contrato.idVigia,
        nome: contrato.nomeVigia,
        avaliacao: contrato.avaliacaoVigia,
        valor: contrato.valor,
        dataInicio: contrato.dataInicio,
        telefone: contrato.telefoneVigia,
    }

    const [frequenciaRonda, setFrequenciaRonda] = useState({})
    const { idUsuario, nomeUsuario, localizacao } = useContext(AuthContext)
    const [botaoChamado, setBotaoChamado] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    const gerarBotaoChamado = chamado => {
        let botao = null
        if (!chamado) {
            botao = <TouchableButton style={[styles.chamadoButton, { backgroundColor: matisse.laranja }]} styleText={styles.chamadoTextButton}
                title='Realizar Chamado'
                onPress={() => {
                    criarChamado({
                        idCliente: idUsuario,
                        idVigia: vigia.id,
                        nomeCliente: nomeUsuario,
                        localizacao: localizacao
                    },
                        chamado => gerarBotaoChamado(chamado)),
                        () => setModalVisible(true)
                }}
            />
        } else {
            botao = <TouchableButton style={[styles.chamadoButton, { backgroundColor: matisse.laranjaAvermelhado }]} styleText={styles.chamadoTextButton}
                title='Cancelar Chamado'
                onPress={() => {
                    cancelarChamado(chamado.id, () => gerarBotaoChamado(null))
                }}
            />
        }
        setBotaoChamado(botao)
    }

    useFocusEffect(
        React.useCallback(() => {
            obterFrequenciaRonda(idUsuario, frequencia => setFrequenciaRonda(frequencia))
            obterChamadoAtivoCliente(idUsuario, chamado => {
                gerarBotaoChamado(chamado)
            })
        }, [])
    )

    let pagamento
    const dataUltimaRonda = frequenciaRonda.dataUltimaRonda
    const mensagemRonda = {
        titulo: `Última Ronda: ${frequenciaRonda.dataUltimaRonda}`,
        descricao: null
    }

    if (dataUltimaRonda != null) {
        mensagemRonda.titulo = `Última Ronda: ${frequenciaRonda.dataUltimaRonda}`

        if (frequenciaRonda.totalRonda > 1) {
            mensagemRonda.descricao = `A sua casa está segura pois o vigia ${"\n"} passou por aí ${frequenciaRonda.totalRonda} vezes nessa data.`

        } else {
            mensagemRonda.descricao = 'Infelizmente o vigia não passou por aí nessa data!'
        }
    } else {
        mensagemRonda.titulo = `Ops, ainda não foi feita uma ${"\n"}ronda na sua área!`
        mensagemRonda.descricao = ""
    }



    if (contrato.isVencido) {
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
                <View style={styles.botaoChamadoContainer}>
                    {botaoChamado}
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
            <ModalBox visible={modalVisible} />
        </Container>
    )
}