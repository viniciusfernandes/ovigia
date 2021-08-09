import React from 'react';
import {
  StyleSheet,
  Text, TextInput, TouchableOpacity, View,
  Image
} from 'react-native';
import Container from '../../components/Container';
import matisse from '../../style/matisse';

const styles = StyleSheet.create({
  bemVindo: {
    fontSize: 25,
    marginLeft: '5%',
    marginRight: 20,
    marginTop: 25,
    fontWeight: 'bold',
    marginBottom: 10,

  },
  formulario: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 30,
    width: '80%'
  },
  esqueciSenha: {
    fontWeight: 'bold',
    marginBottom: '5%',
    textAlign: 'center',

  },
  input: {
    borderBottomColor: matisse.laranja,
    borderBottomWidth: 2,
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 0,
  },
  label: {
    color: matisse.cinzaClaro,
    fontSize: 15,
    marginBottom: 0,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: 'bold',
  },
  botao: {
    borderRadius: 25,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%',
    padding: '2%',
    paddingTop: '2%',
    backgroundColor: 'white',
    elevation: 5,
    textAlign: 'center',
  },
  botaoContainer: {
    marginTop: '5%',
    width: '50%'
  },
  logo: {
    marginBottom: '5%',
    marginTop: '10%',
    height: '20%',
    width: '35%',

  },
  mensagemEntrarCom: {
    color: 'white',
    marginTop: '5%'
  },
  socialMidiaLogo: {
    width: 40,
    height: 40,
  },
  socialMediasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '2%',
    width: '40%'
  },
  naoTemConta: {
    color: matisse.laranjaEscuro,
  },
  cadastre: {
    color: 'white'
  },
  botoesCadastroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '8%'
  }
})


export default props => {
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
        <TextInput style={styles.input}>vinicius@gmail.com</TextInput>
        <Text style={styles.label}>Senha</Text>
        <TextInput secureTextEntry={true} value="abc1234asdf1234" style={[styles.input, { marginBottom: 20 }]} />
        <TouchableOpacity>
          <Text style={styles.esqueciSenha}>Esqueci minha senha</Text>
        </TouchableOpacity>

      </View>
      <TouchableOpacity style={styles.botaoContainer}  >
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

