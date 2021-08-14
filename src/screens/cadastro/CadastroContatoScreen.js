import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useContext } from 'react/cjs/react.development'
import Container from '../../components/Container'
import LabelInput from '../../components/LabelInput'
import TouchableButton from '../../components/TouchableButton'
import AuthContext from '../../contexts/AuthContext'
import styles from './styles/cadastro.styles'
export default (props) => {
    const [contato, setContato] = useState({
        email: 'edu@gmail.com',
        password: '1234',
        nome: 'Edu XXX',
        telefone: '5555555',
        tipoUsuario: 'VIGIA'
    })

    const { signOn } = useContext(AuthContext)

    return (
        <Container backgroundColor='white'>
            <Text style={styles.textoTitulo}>Contato</Text>
            <Text style={[styles.textoMenor, { marginBottom: '10%' }]}>Estamos quase lá!</Text>

            <LabelInput titulo='Nome Completo'
                valor={contato.nome}
                onChangeText={nome => setContato({ ...contato, nome })} />
            <LabelInput titulo='Celular'
                valor={contato.telefone}
                onChangeText={telefone => setContato({ ...contato, telefone })} />
            <LabelInput titulo='E-mail'
                valor={contato.email}
                onChangeText={email => setContato({ ...contato, email })} />
            <LabelInput titulo='Senha'
                valor={contato.password}
                onChangeText={senha => setContato({ ...contato, senha })} />

            <View style={styles.botoesBar}>
                <TouchableButton title='Voltar' style={styles.botaoCinza}
                    styleText={[styles.textoBotao, styles.textoBotaoCinza]}
                    onPress={() => props.navigation.goBack()} />
                <TouchableButton title='Salvar' style={styles.botaoLaranja}
                    styleText={[styles.textoBotao, , styles.textoBotaoLaranja]}
                    onPress={() => signOn(contato, () => props.navigation.navigate('cadastroSucesso'))} />

            </View>
        </Container>
    )
}
