import React, { useState } from 'react';
import {
  Text, TextInput, TouchableOpacity, View,
  Image
} from 'react-native';
import Container from '../../components/Container';
import { RoutesMap } from '../../routes/RoutesMap';
import styles from './styles/login.styles'
import { signIn } from '../../services/auth/auth.service';

const edicaoVigia = RoutesMap.edicaoVigia

export default props => {
  const [credencial, setCredencial] = useState({ email: 'vinicius@gmail.com', password: '1234' })
  return (
    <Container>

      <Image
        style={styles.logo}
        source={{
          uri: 'https://icons.iconarchive.com/icons/custom-icon-design/mono-general-3/128/home-icon.png',
        }}
      />

      <View style={styles.formulario}>

        <Text style={styles.bemVindo}>Bem-Vindo!</Text>
        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} onChangeText={email => setCredencial({ ...credencial, email })} />
        <Text style={styles.label}>Senha</Text>
        <TextInput secureTextEntry={true} style={[styles.input, { marginBottom: 20 }]}
          onChangeText={password => setCredencial({ ...credencial, password })} />
        
        <TouchableOpacity>
          <Text style={styles.esqueciSenha}>Esqueci minha senha</Text>
        </TouchableOpacity>

      </View>
      <TouchableOpacity style={styles.botaoContainer} onPress={() => signIn(credencial)}>
        <Text style={styles.botao}>Entrar
        </Text>
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
        <TouchableOpacity>
          <Text style={[styles.label, styles.cadastre]}>CADASTRE-SE!</Text>
        </TouchableOpacity>

      </View>

    </Container>

  )
}

