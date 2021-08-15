import React, { useContext } from 'react'
import { Image, View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native'
import Container from '../../components/Container'
import TouchableButton from '../../components/TouchableButton'
import AuthContext from '../../contexts/AuthContext'
import styles from './styles/cadastro.styles'

import Geolocation from '@react-native-community/geolocation';
export default (props) => {
    const { setTipoUsuario } = useContext(AuthContext)

    function navigate(tipo) {
        setTipoUsuario({ tipo })
        props.navigation.navigate('cadastroContato')
    }
    Geolocation.getCurrentPosition(
        position => {
            const location = JSON.stringify(position);
            console.info('Location: ' + location)
        },
        error => Alert.alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    return (
        <Container backgroundColor='white'>
            <Text style={styles.textoTitulo}>Vamos Começar!</Text>
            <Text style={styles.textoMenor}>Primeiro, queremos saber</Text>
            <Text style={styles.textoMenor}>se você é:</Text>
            <TouchableOpacity style={[styles.box, styles.boxVigia]}
                onPress={() => {
                    navigate('VIGIA')
                }} >
                <Image
                    style={styles.boxIcon}
                    source={require('../../../images/escudo_branco_75.png')}
                />
                <Text style={styles.tipoUsuario}>Vigia</Text>

            </TouchableOpacity>
            <TouchableOpacity style={[styles.box, styles.boxCliente]}
                onPress={() => {
                    navigate('CLIENTE')
                }}>
                <Image
                    style={styles.boxIcon}
                    source={require('../../../images/usuario_branco_75.png')}
                />
                <Text style={styles.tipoUsuario}>Cliente</Text>
            </TouchableOpacity>
            <View style={styles.botoesBar}>
                <TouchableButton title='Voltar' style={styles.botaoCinza}
                    styleText={[styles.textoBotao, styles.textoBotaoCinza]}
                    onPress={() => props.navigation.goBack()} />

            </View>
        </Container>
    )
}

