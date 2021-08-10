import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthContextProvider from './contexts/AuthContextProvider'
import Routes from './routes/Routes'
export default () => {
  return (
    <NavigationContainer >
      <AuthContextProvider value={{ teste: true }}>
        <Routes />
      </AuthContextProvider>
    </NavigationContainer>
  )
}
