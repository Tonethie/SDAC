import React from 'react'
import Routes from './pages/routes';
import { NavigationContainer } from '@react-navigation/native';

export default function navinext() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}