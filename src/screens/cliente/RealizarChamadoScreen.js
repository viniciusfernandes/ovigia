
import { useFocusEffect } from '@react-navigation/core';
import React, { useContext } from 'react';
import { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import _BackgroundTimer from 'react-native-background-timer';
import { useEffect } from 'react/cjs/react.development';
import Container from '../../components/Container';
import HeaderBox from '../../components/HeaderBox';
import MapBox, { DEFAULT_POSITION } from '../../components/MapBox';
import TouchableButton from '../../components/TouchableButton';
import AuthContext from '../../contexts/AuthContext';
import ClienteContext from '../../contexts/ClienteContext';
import { cancelarChamado, criarChamado, obterChamadoAtivoCliente, obterChamadosAtivos } from '../../services/chamado/chamado.service';
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
    const { idUsuario, nomeUsuario, chamadoAtivo, setChamadoAtivo } = useContext(AuthContext)
    const currentPosition = DEFAULT_POSITION
    const idVigia = 'asdf1234'
    const logradouro = 'Avenida Paulista 1234, cj 66'
    var botao = null

    if (!chamadoAtivo) {

        useFocusEffect(
            React.useCallback(() => {
                obterChamadoAtivoCliente(idUsuario, chamado => {
                    console.info('chamado obtido: ' + JSON.stringify(chamado))
                    setChamadoAtivo(chamado)
                })
            }, [])
        );

        botao = <TouchableButton style={styles.realizarButton} styleText={styles.textButton}
            title='Realizar Chamado'
            onPress={() => {
                criarChamado({
                    idCliente: idUsuario,
                    idVigia: idVigia,
                    nomeCliente: nomeUsuario,
                    logradouro: logradouro,
                    localizacao: {
                        latitude: currentPosition.latitude,
                        longitude: currentPosition.longitude,
                    }
                }, chamado => {
                    setChamadoAtivo(chamado)
                })
            }}
        />
    } else {
        botao = <TouchableButton style={styles.cancelarButton} styleText={styles.textButton}
            title='Cancelar Chamado'
            onPress={() => {
                cancelarChamado(chamadoAtivo.id, () => setChamadoAtivo(null))
            }}
        />
    }
    return (
        <Container>
            <HeaderBox headers={['Olá, ' + nomeUsuario, 'quer um chamado agora?']} detail='Localização do seu vigia' />
            <View style={styles.botoesContainer}>
                {botao}
            </View>
            <View style={styles.mapaContainer}>
                <MapBox coordinates={[currentPosition]} style={{ width: '100%', height: '100%', }} />
            </View>
        </Container>
    );
}