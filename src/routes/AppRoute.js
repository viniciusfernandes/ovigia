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
const TabBarComponent = (props) => (<BottomTabBar {...props} />)
export default () => {

    return (
        <Navigator

            tabBarOptions={{
                showLabel: true,
                 style: {
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    height: '10%'
                }
            }}



        >
            {/* <Screen style={{ borderRadius: 30 }} name="rondaVigia" component={RondaVigiaScreen} />
            <Screen name="edicaoVigia" component={EdicaoVigia} />
            <Screen name="financeiro" component={PerfilVigia} />
            <Screen name="clientes" component={PerfilVigia} />
            <Screen name="ronda" component={ResumoRonda} /> */}

            <Tab.Screen
                name="rondaVigia"
                component={RondaVigiaScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            backgroundColor: 'white',
                            width: 60,
                                    height: 60,
                        }}>
                            <Image
                                source={getIcon(false, 'edicaoVigia')}
                                resizeMode='contain'
                                 
                            />

                        </View>
                    )
                }}
            />
        </Navigator>
    );
}