import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ImageBox from './components/ImageBox'
import ImageBoxRightBar from './components/ImageBoxRightBar'
import Navegacao from './Navegacao'
import Chamado from './screens/vigia/Chamado'

export default class App extends Component {
  render() {
    return (
      <Navegacao />
    )
  }
}
