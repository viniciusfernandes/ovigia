import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useContext } from 'react/cjs/react.development'
import Container from '../../components/Container'
import LabelInput from '../../components/LabelInput'
import TouchableButton from '../../components/TouchableButton'
import AuthContext from '../../contexts/AuthContext'
import styles from './styles/cadastro.styles'
export default (props) => {
    const [usuario, setUsuario] = useState({
        email: 'cliente@gmail.com',
        password: '1234',
        nome: 'Cliente 1  ',
        telefone: '5555555',
        tipoUsuario: 'VIGIA'
    })

    const { isVigia,   cadastrar } = useContext(AuthContext)

    return (
        <Container backgroundColor='white'>
            <Text style={styles.textoTitulo}>Contato</Text>
            <Text style={[styles.textoMenor, { marginBottom: '10%' }]}>Estamos quase lá!</Text>

            <LabelInput titulo='Nome Completo'
                valor={usuario.nome}
                onChangeText={nome => setUsuario({ ...usuario, nome })} />
            <LabelInput titulo='Celular'
                valor={usuario.telefone}
                onChangeText={telefone => setUsuario({ ...usuario, telefone })} />
            <LabelInput titulo='E-mail'
                valor={usuario.email}
                onChangeText={email => setUsuario({ ...usuario, email })} />
            <LabelInput titulo='Senha'
                valor={usuario.password}
                onChangeText={senha => setUsuario({ ...usuario, senha })} />

            <View style={styles.botoesBar}>
                <TouchableButton title='Voltar' style={styles.botaoCinza}
                    styleText={[styles.textoBotao, styles.textoBotaoCinza]}
                    onPress={() => props.navigation.goBack()} />
                <TouchableButton title='Salvar' style={styles.botaoLaranja}
                    styleText={[styles.textoBotao, , styles.textoBotaoLaranja]}
                    onPress={() => cadastrar(usuario, () => props.navigation.navigate('cadastroSucesso'))} />

            </View>
        </Container>
    )
}
