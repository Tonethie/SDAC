import React from 'react';
import { StyleSheet, Image, View, Picker, Text, TextInput, TouchableHighlight } from 'react-native';

export default class Settings extends React.Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.campos}>
                    <Text style={styles.corTexto}>SSID</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do WiFi"
                        underlineColorAndroid="gray"></TextInput>
                    <Text style={styles.corTexto}>Mode</Text>
                    <Picker
                        style={{ height: 50, width: 300 }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                        <Picker.Item label="54Mbps(802.11g)" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                    <Text style={styles.corTexto}>Tipo de Segurança</Text>
                    <Picker
                        style={{ height: 50, width: 300 }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                        <Picker.Item label="WEP" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                    <Text style={styles.corTexto}>Opções de Segurança</Text>
                    <Picker
                        style={{ height: 50, width: 300 }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                        <Picker.Item label="Automática" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                    <Text style={styles.corTexto}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha do WiFi"
                        secureTextEntry={true}
                        underlineColorAndroid="gray"></TextInput>
                    <TouchableHighlight style={styles.loginBtn}>
                        <Text style={styles.loginTxt}>Salvar</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.cadastroContainer}>
                    <TouchableHighlight>
                        <Text style={{marginTop: 40, color: '#f8606b', fontWeight: 'bold'}}>Cancelar</Text>
                    </TouchableHighlight>
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
    },
    campos: {
        justifyContent: 'center',
        paddingLeft: 50,
        marginTop: 40,
    },
    corTexto: {
        color: '#f8606b',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop:10,
    },
    input: {
        width: 290,
        height: 40,
        borderRadius: 25,
        paddingLeft: 15,
    },
    loginBtn: {
        width: 290,
        height: 45,
        borderRadius: 7,
        justifyContent: 'center',
        backgroundColor: '#f8606b',
        marginTop: 40,
    },
    loginTxt: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    cadastroContainer: {
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
});