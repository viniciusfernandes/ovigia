import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import AppRoute from './AppRoute';
import AuthRoute from './AuthRoute';

const Stack = createBottomTabNavigator()
const Navigator = Stack.Navigator

export default () => {
    const { signed } = useContext(AuthContext)
    console.info('routes signed: ' + signed)
    return !signed ? <AppRoute /> : <AuthRoute />
}