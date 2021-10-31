import 'react-native-gesture-handler'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './routes/Routes'
import AuthContext, { AuthContextProvider } from './contexts/AuthContext'
import ClienteContext from './contexts/ClienteContext'
export default () => {
  const { signed } = useContext(AuthContext)
  return (
    <NavigationContainer>
      <AuthContextProvider value={signed}>
        <Routes />
      </AuthContextProvider>
    </NavigationContainer>
  )
}
