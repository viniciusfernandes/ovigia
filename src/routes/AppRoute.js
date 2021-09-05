import React from 'react';
import { Image, Text, View } from 'react-native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PerfilVigia from '../screens/vigia/PerfilVigia'
import ResumoRonda from '../screens/vigia/ResumoRonda';
import EdicaoVigia from '../screens/vigia/EdicaoVigia';
import styles from './styles/app.routes.styles'
import RondaVigiaScreen from '../screens/ronda/RondaVigiaScreen';
import matisse from '../style/matisse';
import { color } from 'react-native-reanimated';
import ChamadosVigiaScreen from '../screens/vigia/ChamadosVigiaScreen';
import IniciarRondaScreen from '../screens/vigia/IniciarRondaScreen';
function getIcon(focused, screenName) {
    if ('iniciarRonda' === screenName) {
        return focused ? require('../../images/overview_laranja_75.png') : require('../../images/overview_preto_75.png')
    } else if ('financeiro' === screenName) {
        return focused ? require('../../images/financeiro_laranja_75.png') : require('../../images/financeiro_preto_75.png')
    } else if ('clientes' === screenName) {
        return focused ? require('../../images/clientes_laranja_75.png') : require('../../images/clientes_preto_75.png')
    } else if ('rondaVigia' === screenName) {
        return focused ? require('../../images/ronda_laranja_75.png') : require('../../images/ronda_preto_75.png')
    } else if ('chamados' === screenName || 'login' === screenName) {
        return focused ? require('../../images/chamados_laranja_75.png') : require('../../images/chamados_preto_75.png')
    }
}

const Tab = createBottomTabNavigator();
const Screen = Tab.Screen
const Navigator = Tab.Navigator
export default () => {

    return (
        <Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    height: '10%',
                    elevation: 50,
                    backgroundColor: matisse.laranjaTransparente
                }
            }}>

            <Screen name="iniciarRonda" component={IniciarRondaScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIcon}>
                            <Image source={getIcon(focused, 'iniciarRonda')} resizeMode='contain' />
                        </View>
                    )
                }}
            />
            <Screen name="financeiro" component={PerfilVigia}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIcon}>
                            <Image source={getIcon(focused, 'financeiro')} resizeMode='contain' />
                        </View>
                    )
                }}
            />

            <Screen name="rondaVigia" component={RondaVigiaScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIcon}>
                            <Image source={getIcon(focused, 'rondaVigia')} resizeMode='contain' />
                        </View>
                    )
                }}
            />
            <Screen name="chamados" component={ChamadosVigiaScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabIcon}>
                            <Image source={getIcon(focused, 'chamados')} resizeMode='contain' />
                        </View>
                    )
                }}
            />
        </Navigator>
    );
}