import React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import the different screens
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
// create our app's navigation stack
import * as firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: 'AIzaSyCnS8w3hCRJsNPZwyWOdXrAMY9Ep2BIHMA',
  authDomain: 'sdac-6dd65.firebaseapp.com',
  databaseURL: 'https://sdac-6dd65.firebaseio.com',
  projectId: 'sdac-6dd65',
  storageBucket: 'sdac-6dd65.appspot.com',
  messagingSenderId: '1016413694584',
  appId: '1:1016413694584:web:0db0f2566149ebdf5a1b8d',
  measurementId: 'G-HEZBDNPWFW',
};

firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="SignIn"
        component={SignIn}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SignUp"
        component={SignUp}
      />
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
