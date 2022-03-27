import React, { useState, useContext } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import Container from '../../components/Container';
import styles from './styles/login.styles'
import AuthContext from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';

export default props => {
  const [credencial, setCredencial] = useState({ email: 'vigia@gmail.com', password: '1234' })
  //const [credencial, setCredencial] = useState({ email: 'cliente1@gmail.com', password: '1234' })
  const { signIn } = useContext(AuthContext)
  const [usuarioInvalido, setUsuarioInvalido] = useState(false)
  const usuarioInvalidoText = usuarioInvalido ? <Text style={styles.usuarioInvalido}>Ops, usuário/senha inválidos!</Text> : null
  useNavigation
  return (
    <Container hideProfile={true}>
      <Image
        style={styles.logo}
        source={require('../../../images/ovigia_branco_75.png')}
      />

      <View style={styles.formulario}>

        <Text style={styles.bemVindo}>Bem-Vindo!</Text>
        <Text style={styles.label}>E-mail</Text>
        <Input style={styles.input}
          value={credencial.email}
          onChangeText={email => setCredencial({ ...credencial, email })} />

        <Text style={styles.label}>Senha</Text>
        <Input secureTextEntry={true}
          value={credencial.password}
          style={[styles.input, { marginBottom: 20 }]}
          onChangeText={password => setCredencial({ ...credencial, password })} />

        <TouchableOpacity>
          {usuarioInvalidoText}
          <Text style={styles.esqueciSenha}>Esqueci minha senha</Text>
        </TouchableOpacity>

      </View>
      <TouchableOpacity style={styles.botaoContainer} onPress={() => signIn(credencial, () => setUsuarioInvalido(true))}>


        <Text style={styles.botao}>Entrar</Text>
      </TouchableOpacity>

      <Text style={[styles.label, styles.mensagemEntrarCom]}>Entrar com as redes</Text>
      <View style={styles.socialMediasContainer}>
        <TouchableOpacity>
          <Image
            style={styles.socialMidiaLogo}
            source={require('../../../images/face_azul_75.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.socialMidiaLogo}
            source={require('../../../images/google_vermelho_75.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.botoesCadastroContainer}>
        <Text style={[styles.label, styles.naoTemConta]}>Não tem conta?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('cadastroTipoUsuario')}>
          <Text style={[styles.label, styles.cadastre]}>CADASTRE-SE!</Text>
        </TouchableOpacity>

      </View>
    </Container>

  )
}

