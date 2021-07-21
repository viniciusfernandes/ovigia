import * as React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import matisse from './style/matisse';
import EdicaoVigia from './EdicaoVigia'
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
                source={{
                    uri: 'https://icons.iconarchive.com/icons/custom-icon-design/mono-general-3/128/home-icon.png',
                }}
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


export default function App() {
    return (
        <NavigationContainer >
            <Tab.Navigator tabBarOptions={{ labelStyle: { fontSize: 20 } }}>
                <Tab.Screen name="EdicaoVigia" component={EdicaoVigia} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
                <Tab.Screen name="xxx" component={HomeScreen} />
                <Tab.Screen name="www" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}