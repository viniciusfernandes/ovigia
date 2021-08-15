import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PerfilVigia from '../screens/vigia/PerfilVigia'
import ResumoRonda from '../screens/vigia/ResumoRonda';
import EdicaoVigia from '../screens/vigia/EdicaoVigia';
import styles from './styles/app.routes.styles'
function getIcon(focused, screenName) {
    if ('edicaoVigia' === screenName) {
        return require('../../images/Home.png')
    } else if ('financeiro' === screenName) {
        return require('../../images/Financeiro.png')
    } else if ('clientes' === screenName) {
        return require('../../images/Clientes.png')
    } else if ('ronda' === screenName) {
        return require('../../images/Ronda.png')
    } else if ('chamados' === screenName || 'login' === screenName) {
        return require('../../images/Chamados.png')
    }
}

const Tab = createBottomTabNavigator();
const Screen = Tab.Screen
const Navigator = Tab.Navigator
export default () => {

    return (
        <Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    return <Image source={getIcon(focused, route.name)} />
                },
            })}

            tabBarOptions={{ showLabel: false }}>
            <Screen name="edicaoVigia" component={EdicaoVigia} />
            <Screen name="financeiro" component={PerfilVigia} />
            <Screen name="clientes" component={PerfilVigia} />
            <Screen name="ronda" component={ResumoRonda} />
        </Navigator>
    );
}