import React from 'react'
import Routes from './pages/routes';
import { NavigationContainer } from '@react-navigation/native';
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

export default function navinext() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
