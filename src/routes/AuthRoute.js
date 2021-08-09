import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/login/LoginScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createBottomTabNavigator()
const Screen = Stack.Screen
const Navigator = Stack.Navigator
export default () => {
    return (
        <Navigator>
            <Screen name="login" component={Login} options={{ tabBarVisible: false }} />
        </Navigator>
    );
}