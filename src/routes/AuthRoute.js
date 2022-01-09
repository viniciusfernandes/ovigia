import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/login/LoginScreen';
import CadastroTipoUsuario from '../screens/cadastro/CadastroTipoUsuarioScreen';
import CadastroContato from '../screens/cadastro/CadastroContatoScreen';
import CadastroSucessoScreen from '../screens/cadastro/CadastroSucessoScreen';

const Stack = createBottomTabNavigator()
const Screen = Stack.Screen
const Navigator = Stack.Navigator
export default () => {
    return (
        <Navigator>
            <Screen name="login" component={LoginScreen} options={{ tabBarVisible: false }} />
            <Screen name="cadastroTipoUsuario" component={CadastroTipoUsuario} options={{ tabBarVisible: false }} />
            <Screen name="cadastroContato" component={CadastroContato} options={{ tabBarVisible: false }} />
            <Screen name="cadastroSucesso" component={CadastroSucessoScreen} options={{ tabBarVisible: false }} />
        </Navigator>
    );
}