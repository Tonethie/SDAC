import React from 'react'
import { Button, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import the different screens
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
// create our app's navigation stack

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="SignIn" component={SignIn} />
      <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}