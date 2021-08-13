import React, { useContext } from 'react'
import { Image, View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native'
import Container from '../../components/Container'
import TouchableButton from '../../components/TouchableButton'
import styles from './styles/cadastro.styles'
export default (props) => {
    return (
        <Container backgroundColor='white'>
            <Text style={styles.textoTitulo}>Vamos Começar!</Text>
            <Text style={styles.textoMenor}>Primeiro, queremos saber</Text>
            <Text style={styles.textoMenor}>se você é:</Text>
            <TouchableOpacity style={[styles.box, styles.boxVigia]}>
                <Image
                    style={styles.boxIcon}
                    source={require('../../../images/escudo_branco_75.png')}
                />
                <Text style={styles.tipoUsuario}>Vigia</Text>

            </TouchableOpacity>
            <TouchableOpacity style={[styles.box, styles.boxCliente]}>
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
                <TouchableButton title='Próximo' style={styles.botaoLaranja}
                    styleText={[styles.textoBotao, , styles.textoBotaoLaranja]}
                    onPress={() => props.navigation.navigate('cadastroContato')} />

            </View>
        </Container>
    )
}
