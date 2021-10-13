
import React, { useContext } from 'react';
import { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import _BackgroundTimer from 'react-native-background-timer';
import Container from '../../components/Container';
import HeaderBox from '../../components/HeaderBox';
import MapBox, { DEFAULT_POSITION } from '../../components/MapBox';
import TouchableButton from '../../components/TouchableButton';
import AuthContext from '../../contexts/AuthContext';
import { criarChamado } from '../../services/chamado/chamado.service';
import matisse from '../../style/matisse';

const styles = StyleSheet.create({
    mapaContainer: {
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    iniciarButton: {
        position: 'absolute',
        top: '65%',
        backgroundColor: matisse.laranja,
        width: '45%'
    },
    textButton: {
        color: 'white',
        fontSize: 20
    },
});

export default props => {
    const [chamadoRealizado] = useState(false)
    const { idUsuario, nomeUsuario } = useContext(AuthContext)
    const currentPosition = DEFAULT_POSITION
    const idVigia = 'asdf1234'
    return (
        <Container>
            <HeaderBox headers={['Olá, ' + nomeUsuario, 'quer um chamado agora?']} detail='Localização do seu vigia' />

            <View style={styles.mapaContainer}>
                <MapBox coordinates={[currentPosition]} style={{ width: '100%', height: '100%', }} />
                <TouchableButton style={styles.iniciarButton} styleText={styles.textButton}
                    title={!chamadoRealizado ? 'Fazer Chamado' : 'Cancelar Chamado'}
                    onPress={() => {
                        criarChamado(idUsuario, idVigia, response => console.info('chamado id: ' + JSON.stringify(response)))
                    }}
                />

            </View>
        </Container>
    );
}