import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RoutesMap } from './RoutesMap';
import LoginScreen from '../screens/login/LoginScreen';

const Stack = createBottomTabNavigator()
const Screen = Stack.Screen
const Navigator = Stack.Navigator
export default () => {
    const login = RoutesMap.login
    return (
        <Navigator>
            <Screen name="login" component={LoginScreen} options={{ tabBarVisible: false }} />
        </Navigator>
    );
}