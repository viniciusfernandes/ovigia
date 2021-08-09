import React, { useContext } from 'react';
import { Image, StyleSheet, } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import matisse from '../style/matisse';
import PerfilVigia from '../screens/vigia/PerfilVigia'
import ResumoRonda from '../screens/vigia/ResumoRonda';
import EdicaoVigia from '../screens/vigia/EdicaoVigia';
import AuthContext from '../contexts/AuthContext';

const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({
    destaque: {
        fontSize: 25,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        width: 300
    },
    container: {
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 30,
        elevation: 5,


    },
    input: {
        borderBottomColor: matisse.laranja,
        borderBottomWidth: 2,
        height: 40,
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 0,
    },
    label: {
        color: matisse.cinzaClaro,
        fontSize: 15,
        marginBottom: 0,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: 'bold',
    },
    botao: {
        alignContent: 'center',
        borderRadius: 25,
        width: 200,
        marginTop: 50,
        padding: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
        elevation: 25,
    },
    logo: {
        width: 100,
        height: 100,
    },

    icon: {
        width: 30,
        height: 30
    }

})

function getIcon(focused, screenName) {
    if ('home' === screenName) {
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

export default () => {
    const { authenticated } = useContext(AuthContext)
    console.warn(authenticated)
    return (
        <>
            <Tab.Navigator
                initialRouteName={'login'}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Image style={styles.icon} source={getIcon(focused, route.name)} />
                    },
                })}

                tabBarOptions={{ showLabel: false }}>


                <Tab.Screen name="home" component={EdicaoVigia} />
                <Tab.Screen name="financeiro" component={PerfilVigia} />
                <Tab.Screen name="clientes" component={PerfilVigia} />
                <Tab.Screen name="ronda" component={ResumoRonda} />
            </Tab.Navigator>

        </>
    );
}