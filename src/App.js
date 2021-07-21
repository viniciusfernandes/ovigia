import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
 import matisse from './style/matisse' 
import Login from './components/views/login/Login'
import Navegacao from './Navegacao'
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
      //<View style={styles.container}>
        <Navegacao/>
       
      //</View>
    )
  }
}
