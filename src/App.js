import 'react-native-gesture-handler'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './routes/Routes'
import AuthContext, { AuthContextProvider } from './contexts/AuthContext'
import { RondaVigiaContextProvider } from './contexts/RondaVigiaContext'
export default () => {
  const { signed } = useContext(AuthContext)
  return (
    <NavigationContainer>
      <AuthContextProvider value={signed}>
        <RondaVigiaContextProvider>
          <Routes />
        </RondaVigiaContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  )
}
