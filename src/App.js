import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppRoute from './routes/AppRoute'
import AuthContext from './contexts/AuthContext'
export default () => {
  const [signed, setSigned] = useState({ signed: false })
  return (
    <NavigationContainer >
      <AuthContext.Provider value={signed}>
        <AppRoute />
      </AuthContext.Provider>
    </NavigationContainer>
  )
}
