import React from 'react';
import { StyleSheet, Alert, View, TouchableOpacity, Text, Linking  } from 'react-native';
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Home screen
 */


export default class Home extends React.Component {
    ifScanned = e => {
        Linking.openURL(e.data).catch(err =>
            Alert.alert("QRCode inválido", e.data));
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.txtContainer}>
                    <Text style={styles.titulo}>Procurando QR Code</Text>
                </View>
                <QRCodeScanner
                    onRead={this.ifScanned}
                    size={10}
                    flashMode={RNCamera.Constants.FlashMode.torch}
                    reactivate={true}
                    permissionDialogMessage="Permissão para acessar a câmera"
                    reactivateTimeout={10}
                    showMarker={true}
                    markerStyle={{borderColor:"#FFF", borderRadius:10}}
                    bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Icon name="camera-iris" color={'#f8606b'} size={55}></Icon>
                    </TouchableOpacity>
                    }
                />

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    txtContainer:{
        justifyContent:"center",
        alignItems: "center",
        marginTop: 15,
        marginBottom: -100
    },
    titulo: {
        color: '#334048',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        marginTop: 55
    }
});