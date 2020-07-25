import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'
import ListBT from './ListBT';
import Home from './Home';
import Settings from './Settings';
import { DrawerContent } from './DrawerContent';
Icon.loadFont();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeScreen = ({navigation}) => (
    <Stack.Navigator>
        <Stack.Screen options={{
            headerShown: true,
            title: 'Início',
            headerLeft: () => (
                <Icon name="menu-outline" size={25}
                onPress={() =>{navigation.openDrawer()}}></Icon>
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
                <Icon name="menu-outline" size={25}
                onPress={() =>{navigation.openDrawer()}}></Icon>
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
                <Icon name="menu-outline" size={25}
                onPress={() =>{navigation.openDrawer()}}></Icon>
            )
        }} name="Settings" component={Settings} />
    </Stack.Navigator>
);


export default function HomeRoutes () {
    return(
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="ListBT" component={ListBTScreen} />
            <Drawer.Screen name="Settings" component={SettingScreen} />
        </Drawer.Navigator>
    );
}