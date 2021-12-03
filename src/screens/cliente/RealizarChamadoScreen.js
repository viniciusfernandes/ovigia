
import { useFocusEffect } from '@react-navigation/core';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import _BackgroundTimer from 'react-native-background-timer';
import { useState } from 'react/cjs/react.development';
import Container from '../../components/Container';
import HeaderBox from '../../components/HeaderBox';
import MapBox, { DEFAULT_POSITION } from '../../components/MapBox';
import TouchableButton from '../../components/TouchableButton';
import AuthContext from '../../contexts/AuthContext';
import { cancelarChamado, criarChamado, obterChamadoAtivoCliente, } from '../../services/chamado/chamado.service';
import { obterIdVigiaCliente } from '../../services/cliente/cliente.service';
import matisse from '../../style/matisse';

const styles = StyleSheet.create({
    botoesContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: '80%',
        width: '100%',
        zIndex: 1,
    },
    mapaContainer: {
        backgroundColor: matisse.laranja,
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    },
    realizarButton: {
        position: 'relative',
        bottom: '5%',
        backgroundColor: matisse.laranja,
        width: '45%',
    },
    cancelarButton: {
        position: 'relative',
        bottom: '5%',
        backgroundColor: matisse.laranjaAvermelhado,
        width: '55%',
    },
    textButton: {
        color: 'white',
        fontSize: 20
    },
});

export default props => {
    const { idUsuario, nomeUsuario, localizacao } = useContext(AuthContext)
    const [idVigia, setIdVigia] = useState(null)
    const [botaoChamado, setBotaoChamado] = useState(null)
    const gerarBotaoChamado = chamado => {
        let botao = null
        if (!chamado) {
            botao = <TouchableButton style={styles.realizarButton} styleText={styles.textButton}
                title='Realizar Chamado'
                onPress={() => {
                    criarChamado({
                        idCliente: idUsuario,
                        idVigia: idVigia,
                        nomeCliente: nomeUsuario,
                        localizacao: localizacao
                    }, chamado => gerarBotaoChamado(chamado))
                }}
            />
        } else {
            botao = <TouchableButton style={styles.cancelarButton} styleText={styles.textButton}
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
            obterChamadoAtivoCliente(idUsuario, chamado => {
                gerarBotaoChamado(chamado)
            })
            obterIdVigiaCliente(idUsuario, response => setIdVigia(response.idVigia))
        }, [])
    );

    return (
        <Container>
            <HeaderBox headers={['Olá, ' + nomeUsuario, 'quer um chamado agora?']} detail='Localização do seu vigia' />
            <View style={styles.botoesContainer}>
                {botaoChamado}
            </View>

        </Container>
    );
}