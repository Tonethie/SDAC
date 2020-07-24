import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

import SignIn from './SignIn';
import SignUp from './SignUp';
//import Home from './Home';
import HomeRoutes from './home.routes'

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignIn} />
            <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp} />
            <Stack.Screen options={{headerShown: false}} name="Home" component={HomeRoutes} />
          </Stack.Navigator>
    );
}