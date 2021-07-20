import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import EdicaoView from './EdicaoView'
import EdicaoVigia from './EdicaoVigia'
import PerfilVigia from './PerfilVigia'
import Signin from './Signin'

const laranja = '#F38223'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: laranja, alignItems: 'center'
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
        <PerfilVigia/>
      </View>
    )
  }
}
