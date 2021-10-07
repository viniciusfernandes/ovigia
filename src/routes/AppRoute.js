import React, { useContext } from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PerfilVigia from '../screens/vigia/PerfilVigia'
import styles from './styles/app.routes.styles'
import RondaVigiaScreen from '../screens/ronda/RondaVigiaScreen';
import ChamadosVigiaScreen from '../screens/vigia/ChamadosVigiaScreen';
import IniciarRondaScreen from '../screens/vigia/IniciarRondaScreen';
import ResumoRondaScreen from '../screens/ronda/ResumoRondaScreen';
import matisse from '../style/matisse';
import AuthContext from '../contexts/AuthContext';
import AcompanharRondaScreen from '../screens/cliente/AcompanharRondaScreen';
import BuscarVigiaScreen from '../screens/cliente/BuscarVigiaScreen';
function getIcon(focused, screenName) {
    if ('iniciarRonda' === screenName || 'acompanharRonda' === screenName) {
        return focused ? require('../../images/overview_laranja_75.png') : require('../../images/overview_preto_75.png')
    } else if ('financeiro' === screenName) {
        return focused ? require('../../images/financeiro_laranja_75.png') : require('../../images/financeiro_preto_75.png')
    } else if ('clientes' === screenName) {
        return focused ? require('../../images/clientes_laranja_75.png') : require('../../images/clientes_preto_75.png')
    } else if ('rondaVigia' === screenName) {
        return focused ? require('../../images/ronda_laranja_75.png') : require('../../images/ronda_preto_75.png')
    } else if ('chamados' === screenName || 'login' === screenName) {
        return focused ? require('../../images/chamados_laranja_75.png') : require('../../images/chamados_preto_75.png')
    } else if ('buscarVigia' === screenName) {
        return focused ? require('../../images/busca_laranja_75.png') : require('../../images/busca_preto_75.png')
    }
}

const Tab = createBottomTabNavigator();
const Screen = Tab.Screen
const Navigator = Tab.Navigator
export default () => {
    const { isVigia } = useContext(AuthContext)
    var initialScreen = null
    if (isVigia) {
        initialScreen = <Screen name="iniciarRonda" component={IniciarRondaScreen} />
    } else {
        initialScreen = <Screen name="acompanharRonda" component={AcompanharRondaScreen} />
    }
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
            {initialScreen}
            <Screen name="financeiro" component={PerfilVigia} />
            <Screen name="rondaVigia" component={RondaVigiaScreen} />
            <Screen name="buscarVigia" component={BuscarVigiaScreen} />
            <Screen name="chamados" component={ChamadosVigiaScreen} />
            <Screen name="resumoRonda" component={ResumoRondaScreen} options={{ tabBarButton: () => null }} />
        </ Navigator>

    );
}