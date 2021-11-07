import React, { useContext } from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PerfilVigia from '../screens/vigia/PerfilVigia'
import styles from './styles/app.routes.styles'
import RondaVigiaScreen from '../screens/ronda/RondaVigiaScreen';
import ChamadosVigiaScreen from '../screens/vigia/ChamadosVigiaScreen';
import IniciarRondaScreen from '../screens/ronda/IniciarRondaScreen';
import ResumoRondaScreen from '../screens/ronda/ResumoRondaScreen';
import matisse from '../style/matisse';
import AuthContext from '../contexts/AuthContext';
import AcompanharRondaScreen from '../screens/cliente/AcompanharRondaScreen';
import BuscarVigiaScreen from '../screens/cliente/BuscarVigiaScreen';
import RealizarChamadoScreen from '../screens/cliente/RealizarChamadoScreen';
import ConsultarFinancasClienteScreen from '../screens/cliente/ConsultarFinancasClienteScreen';
function getIcon(focused, screenName) {
    if ('iniciarRonda' === screenName || 'acompanharRonda' === screenName) {
        return focused ? require('../../images/overview_laranja_75.png') : require('../../images/overview_preto_75.png')
    } else if ('financeiro' === screenName || 'consultarFinancasCliente' === screenName) {
        return focused ? require('../../images/financeiro_laranja_75.png') : require('../../images/financeiro_preto_75.png')
    } else if ('clientes' === screenName) {
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
        screens.push(<Screen key='iniciarRonda' name='iniciarRonda' component={IniciarRondaScreen} />)
        screens.push(<Screen key='financeiro' name='financeiro' component={PerfilVigia} />)
        screens.push(<Screen key='rondaVigia' name='rondaVigia' component={RondaVigiaScreen} />)
        screens.push(<Screen key='chamados' name='chamados' component={ChamadosVigiaScreen} />)
        screens.push(<Screen key='resumoRonda' name='resumoRonda' component={ResumoRondaScreen} options={{ tabBarButton: () => null }} />)
    } else {
        screens.push(<Screen key='acompanharRonda' name='acompanharRonda' component={AcompanharRondaScreen} />)
        screens.push(<Screen key='consultarFinancasCliente' name='consultarFinancasCliente' component={ConsultarFinancasClienteScreen} />)
        screens.push(<Screen key='buscarVigia' name='buscarVigia' component={BuscarVigiaScreen} />)
        screens.push(<Screen key='realizarChamado' name='realizarChamado' component={RealizarChamadoScreen} />)
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