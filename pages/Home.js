import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, TextInput, TouchableHighlight } from 'react-native';
import { DrawerContent } from './DrawerContent';

/**
 * Home screen
 */

export default function Home () {
    return(
        <View style={styles.container}>
            <View style={styles.txtContainer}>
                <Text>Você chegou na Home</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    txtContainer:{
        justifyContent:"center",
        alignItems: "center"
    }
});