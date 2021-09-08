import React from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PerfilVigia from '../screens/vigia/PerfilVigia'
import styles from './styles/app.routes.styles'
import RondaVigiaScreen from '../screens/ronda/RondaVigiaScreen';
import ChamadosVigiaScreen from '../screens/vigia/ChamadosVigiaScreen';
import IniciarRondaScreen from '../screens/vigia/IniciarRondaScreen';
import ResumoRondaScreen from '../screens/ronda/ResumoRondaScreen';
import matisse from '../style/matisse';
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
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return (
                        <View style={styles.tabIcon}>
                            <Image source={getIcon(focused, route.name)} />
                        </View>
                    )
                },

            })}
        >

            <Screen name="iniciarRonda" component={IniciarRondaScreen} />
            <Screen name="financeiro" component={PerfilVigia} />
            <Screen name="rondaVigia" component={RondaVigiaScreen} />
            <Screen name="chamados" component={ChamadosVigiaScreen} />
            <Screen name="resumoRonda" component={ResumoRondaScreen} options={{ tabBarButton: () => null }} />
        </ Navigator>

    );
}