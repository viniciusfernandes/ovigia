import React, { useContext } from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PerfilVigia from '../screens/vigia/PerfilVigia'
import styles from './styles/app.routes.styles'
import RondaVigiaScreen from '../screens/ronda/RondaVigiaScreen';
import ChamadosVigiaScreen from '../screens/vigia/ChamadosVigiaScreen';
import HomeVigiaScreen from '../screens/ronda/HomeVigiaScreen';
import matisse from '../style/matisse';
import AuthContext from '../contexts/AuthContext';
import BuscarVigiaScreen from '../screens/cliente/BuscarVigiaScreen';
import SolicitacoesVisitasScreen from '../screens/vigia/SolicitacoesVisitasScreen';
import HomeClienteScreen from '../screens/cliente/HomeClienteScreen';
function getIcon(focused, screenName) {
    if ('homeVigia' === screenName || 'homeCliente' === screenName) {
        return focused ? require('../../images/overview_laranja_75.png') : require('../../images/overview_preto_75.png')
    } else if ('solicitacoesVisitas' === screenName) {
        return focused ? require('../../images/clientes_laranja_75.png') : require('../../images/clientes_preto_75.png')
    } else if ('rondaVigia' === screenName) {
        return focused ? require('../../images/ronda_laranja_75.png') : require('../../images/ronda_preto_75.png')
    } else if ('chamados' === screenName || 'realizarChamado' === screenName) {
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
    var screens = []
    if (isVigia) {
        screens.push(<Screen key='homeVigia' name='homeVigia' component={HomeVigiaScreen} />)
        screens.push(<Screen key='solicitacoesVisitas' name='solicitacoesVisitas' component={SolicitacoesVisitasScreen} />)
        screens.push(<Screen key='rondaVigia' name='rondaVigia' component={RondaVigiaScreen} />)
        screens.push(<Screen key='chamados' name='chamados' component={ChamadosVigiaScreen} />)
    } else {
        screens.push(<Screen key='homeCliente' name='homeCliente' component={HomeClienteScreen} />)
        screens.push(<Screen key='buscarVigia' name='buscarVigia' component={BuscarVigiaScreen} />)
    }
    return (
        <Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    // borderTopLeftRadius: 25,
                    // borderTopRightRadius: 25,
                    height: '10%',
                    elevation: 3,
                    // backgroundColor: matisse.laranjaTransparente
                    backgroundColor: matisse.cinzaTransparente
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
            {screens}
        </ Navigator>

    );
}