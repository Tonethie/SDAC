import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text, TextInput, TouchableHighlight } from 'react-native';

export default class Settings extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.txtContainer}>
                    <Text>Você chegou nas Configurações</Text>
                </View>
            </View>
        );
    }
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