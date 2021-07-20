import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import BotaoPerfil from './BotaoPerfil'
import EdicaoVigia from './EdicaoVigia'
import Login from './Login'
import matisse from './style/matisse'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: matisse.laranja, alignItems: 'center'
  },

  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

export default class App extends Component {


  render() {
    return (
      <View style={styles.container}>
        <Login />
      </View>
    )
  }
}
