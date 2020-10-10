import React from 'react';
import { StyleSheet, Alert, View, TouchableOpacity, Text, Linking  } from 'react-native';
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase/app';
import auth from 'firebase/auth';
import database from 'firebase/database';
/**
 * Home screen
 */


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          btid: '',
          btpassword: '',
        };
      }
    
      saveDataFirebase = (btid, btpassword) => {
        firebase
          .database()
          .ref('/users/' + firebase.auth().currentUser.uid + '/bt_data')
          .push({
            nomebt: btid,
            senhabt: btpassword,
          }).catch((error) => {
            alert(error.message);
          })
          .then(() => this.props.navigation.navigate('ListBT'));
      };

    ifScanned = e => {
        var dados = (e.data);
        var separador = dados.split(" ", 2);
        if ((separador.length != 2) || !(dados.includes(" "))) {
            Alert.alert("Código inválido!")
        }else{

            var btid = separador[0];
            var btpassword = separador[1];
            this.setState({btid: btid});
            this.setState({btpassword: btpassword});
    
            Alert.alert("Bluetooth Encontrado", "Deseja adicionar o bluetooth: " + btid + " em sua lista?",
            [
                {
                    text: "Adicionar",
                    onPress: () => this.saveDataFirebase(this.state.btid, this.state.btpassword)
                },
                {
                    text:"Cancelar",
                    onPress: () => console.log("Cancelado"),
                    style: "cancel"
                }
            ],
            );
        }
        
        
        /*Linking.openURL(e.data).catch(err =>
            Alert.alert("QRCode inválido", e.data));*/
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
                    flashMode={RNCamera.Constants.FlashMode.off}
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
