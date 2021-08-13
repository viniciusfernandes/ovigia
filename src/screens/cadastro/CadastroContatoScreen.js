import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Container from '../../components/Container'
import LabelInput from '../../components/LabelInput'
import TouchableButton from '../../components/TouchableButton'
import { criarVigia } from '../../services/vigia/vigia.services'
import styles from './styles/cadastro.styles'
export default (props) => {
    const [contato, setContato] = useState({})
    return (
        <Container backgroundColor='white'>
            <Text style={styles.textoTitulo}>Contato</Text>
            <Text style={[styles.textoMenor, { marginBottom: '10%' }]}>Estamos quase lá!</Text>

            <LabelInput titulo='Nome Completo' onChangeText={nomeCompleto => setContato({ ...contato, nomeCompleto })} />
            <LabelInput titulo='Celular' onChangeText={telefone => setContato({ ...contato, telefone })} />
            <LabelInput titulo='E-mail' onChangeText={email => setContato({ ...contato, email })} />
            <LabelInput titulo='Senha' onChangeText={senha => setContato({ ...contato, senha })} />

            <View style={styles.botoesBar}>
                <TouchableButton title='Voltar' style={styles.botaoCinza}
                    styleText={[styles.textoBotao, styles.textoBotaoCinza]}
                    onPress={() => props.navigation.goBack()} />
                <TouchableButton title='Salvar' style={styles.botaoLaranja}
                    styleText={[styles.textoBotao, , styles.textoBotaoLaranja]}
                    onPress={() => criarVigia(contato, data => props.navigation.navigate('cadastroSucesso'))} />

            </View>
        </Container>
    )
}
