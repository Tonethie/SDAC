import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons'
import ListBT from './ListBT';
import Home from './Home';
import Settings from './Settings';
Icon.loadFont();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeScreen = ({navigation}) => (
    <Stack.Navigator>
        <Stack.Screen options={{
            headerShown: true,
            title: 'Início',
            headerLeft: () => (
                <Icon.Button name="add" size={25}
                backgroundColor="#009387" onPress={() =>{navigation.openDrawer()}}></Icon.Button>
            )
        }} name="Home" component={Home} />
    </Stack.Navigator>
);
const ListBTScreen = ({navigation}) => (
    <Stack.Navigator>
        <Stack.Screen options={{
            headerShown: true,
            title: 'Lista BT',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25}
                backgroundColor="#009387" onPress={() =>{navigation.openDrawer()}}></Icon.Button>
            )
        }} name="ListBT" component={ListBT} />
    </Stack.Navigator>
);
const SettingScreen = ({navigation}) => (
    <Stack.Navigator>
        <Stack.Screen options={{
            headerShown: true,
            title: 'Configurações',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25}
                backgroundColor="#009387" onPress={() =>{navigation.openDrawer()}}></Icon.Button>
            )
        }} name="Settings" component={Settings} />
    </Stack.Navigator>
);


export default function HomeRoutes () {
    return(
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="ListBT" component={ListBTScreen} />
            <Drawer.Screen name="Settings" component={SettingScreen} />
        </Drawer.Navigator>
    );
}