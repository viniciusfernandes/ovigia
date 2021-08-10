import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AppRoute from './AppRoute';
import AuthRoute from './AuthRoute';

const Stack = createBottomTabNavigator()
const Navigator = Stack.Navigator

export default () => {
    // const { signed } = useContext(AuthContext)
    const signed = false
    return signed ? <AppRoute /> : <AuthRoute />
}