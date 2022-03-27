import React, { useContext, useState } from 'react'
import { View, Text } from 'react-native'
import Container from '../../components/Container'
import LabelInput from '../../components/LabelInput'
import TouchableButton from '../../components/TouchableButton'
import AuthContext from '../../contexts/AuthContext'
import styles from './styles/cadastro.styles'
export default (props) => {
    const [usuario, setUsuario] = useState({
        email: 'vigia@gmail.com',
        password: '1234',
        nome: 'Vigia Teste',
        telefone: '5555555',
        tipoUsuario: 'VIGIA'
    })

    const { signOn } = useContext(AuthContext)
    const labelStyle = { marginTop: 20 }
    return (
        <Container backgroundColor='white'>
            <Text style={styles.textoTitulo}>Contato</Text>
            <Text style={[styles.textoMenor, { marginBottom: '10%' }]}>Estamos quase lá!</Text>

            <LabelInput titulo='Nome Completo'
                valor={usuario.nome}
                onChangeText={nome => setUsuario({ ...usuario, nome })} />
            <LabelInput titulo='Celular'
                valor={usuario.telefone}
                onChangeText={telefone => setUsuario({ ...usuario, telefone })}
                labelStyle={labelStyle} />
            <LabelInput titulo='E-mail'
                valor={usuario.email}
                onChangeText={email => setUsuario({ ...usuario, email })}
                labelStyle={labelStyle} />
            <LabelInput titulo='Senha'
                valor={usuario.password}
                onChangeText={senha => setUsuario({ ...usuario, senha })}
                labelStyle={labelStyle} />

            <View style={styles.botoesBar}>
                <TouchableButton title='Voltar' style={styles.botaoCinza}
                    styleText={[styles.textoBotao, styles.textoBotaoCinza]}
                    onPress={() => props.navigation.goBack()} />
                <TouchableButton title='Salvar' style={styles.botaoLaranja}
                    styleText={[styles.textoBotao, , styles.textoBotaoLaranja]}
                    onPress={() => signOn(usuario)} />

            </View>
        </Container>
    )
}
