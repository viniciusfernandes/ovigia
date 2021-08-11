import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RoutesMap } from './RoutesMap';
import LoginScreen from '../screens/login/LoginScreen';
import CadastroTipoUsuario from '../screens/cadastro/CadastroTipoUsuario';

const Stack = createBottomTabNavigator()
const Screen = Stack.Screen
const Navigator = Stack.Navigator
export default () => {
    const login = RoutesMap.login
    return (
        <Navigator>
            <Screen name="login" component={CadastroTipoUsuario} options={{ tabBarVisible: false }} />
        </Navigator>
    );
}