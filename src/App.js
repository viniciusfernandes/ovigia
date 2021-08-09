import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthContext from './contexts/AuthContext'
import Routes from './routes/Routes'
export default () => {
  return (
    <NavigationContainer >
      <AuthContext.Provider value={{teste:true}}>
        <Routes />
      </AuthContext.Provider>
    </NavigationContainer>
  )
}
