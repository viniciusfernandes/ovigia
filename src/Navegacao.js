import * as React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import matisse from './style/matisse';
import EdicaoVigia from './EdicaoVigia'
import Chamado from './screens/vigia/Chamado';
import PerfilVigia from './PerfilVigia';
function HomeScreen() {
    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Image
                style={styles.logo}
                source={require('../images/Button-Next-icon.png')}
            />
        </View>
    );
}

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
    }, socialLogo: {
        width: 40,
        height: 40,
    },
})

const Icons = {
    home: { icon: '../images/Financeiro.png', focusIcon: '../images/Financeiro.png' }
}

function getIcon(focused, screenName) {
    let icon = null
    let styleIcon = { width: 30, height: 30 }
    if ('home' === screenName) {
        return <Image style={styleIcon} source={require('../images/Home.png')} />
    } else if ('financeiro' === screenName) {
        return <Image style={styleIcon} source={require('../images/Financeiro.png')} />
    } else if ('clientes' === screenName) {
        return <Image style={styleIcon} source={require('../images/Clientes.png')} />
    } else if ('ronda' === screenName) {
        return <Image style={styleIcon} source={require('../images/Ronda.png')} />
    } else if ('chamados' === screenName) {
        return <Image style={styleIcon} source={require('../images/Chamados.png')} />
    }
}


export default () => {
    return (
        <NavigationContainer >
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {

                        return getIcon(focused, route.name)
                    },
                })}

                tabBarOptions={{ showLabel: false }}>

                <Tab.Screen name="home" component={PerfilVigia} />
                <Tab.Screen name="financeiro" component={SettingsScreen} />
                <Tab.Screen name="clientes" component={HomeScreen} />
                <Tab.Screen name="ronda" component={SettingsScreen} />
                <Tab.Screen name="chamados" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}