import React from 'react';
import {
  StyleSheet,
  Text, TextInput, TouchableOpacity, View,
  Image
} from 'react-native';

const laranja = '#F38223'

const styles = StyleSheet.create({
  destaque: {
    fontSize: 25,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    width: 300
  },
  container: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 30,


  },
  input: {
    borderBottomColor: laranja,
    borderBottomWidth: 2,
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 0,
  },
  label: {
    color: '#C3C9C9',
    fontSize: 15,
    marginBottom: 0,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: 'bold',
  },
  botao: {
    alignContent: 'center',
    borderRadius: 25,
    width: 200,
    marginTop: 50,
    padding: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
    elevation: 25,
  },
  logo: {
    width: 100,
    height: 100,
  }, socialLogo: {
    width: 40,
    height: 40,
  },
})


export default props => {


  return (
    <>
      <View style={[styles.container, { height: 100, marginTop: 25, marginBottom: 50 }]}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://icons.iconarchive.com/icons/custom-icon-design/mono-general-3/128/home-icon.png',
          }}
        />
      </View>
      <View style={styles.container}>

        <Text style={styles.destaque}>Bem-Vindo!</Text>
        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input}>vinicius@gmail.com</TextInput>
        <Text style={styles.label}>Senha</Text>
        <TextInput secureTextEntry={true} value="abc1234asdf1234" style={[styles.input, { marginBottom: 20 }]} />
        <TouchableOpacity><Text style={{ textAlign: 'center', marginBottom: 15 }}>Esqueci minha senha</Text></TouchableOpacity>

      </View>
      <TouchableOpacity style={styles.botao}><Text style={{
        textAlign: 'center', fontSize: 20, fontWeight: 'bold'
      }}>Entrar</Text></TouchableOpacity>

      <Text style={[styles.label, { color: 'white', marginTop: 40 }]}>Entrar com as redes</Text>
      <View style={[{ flexDirection: 'row', marginTop: 10 }]}>
        <TouchableOpacity>
          <Image
            style={[styles.socialLogo, { marginRight: 20 }]}
            source={{
              uri: 'https://icons.iconarchive.com/icons/sicons/basic-round-social/96/facebook-icon.png',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.socialLogo}
            source={{
              uri: 'https://icons.iconarchive.com/icons/martz90/circle/96/google-plus-icon.png',
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={[{ flexDirection: 'row', marginTop: 10 }]}>
        <Text style={[styles.label, { color: '#BF5818', marginTop: 30 }]}>Não tem conta?</Text>
        <TouchableOpacity>
          <Text style={[styles.label, { color: 'white', marginTop: 30 }]}>CADASTRE-SE!</Text>
        </TouchableOpacity>

      </View>

    </>

  )
}

