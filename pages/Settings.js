import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Picker,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import * as firebase from 'firebase/app';
import auth from 'firebase/auth';
import database from 'firebase/database';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ssid: '',
      wifipassword: '',
    };
  }

  saveDataFirebase = (ssid, wifipassword) => {
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid + '/wifi_data')
      .set({
        nomewifi: ssid,
        senhawifi: wifipassword,
      }).catch((error) => alert(error.message))
      .then(() => this.props.navigation.navigate('Home'));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.campos}>
          <Text style={styles.corTexto}>SSID</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do WiFi"
            underlineColorAndroid="gray"
            onChangeText={(ssid) => this.setState({ssid})}></TextInput>
          <Text style={styles.corTexto}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Senha do WiFi"
            secureTextEntry={true}
            underlineColorAndroid="gray"
            onChangeText={(wifipassword) =>
              this.setState({wifipassword})
            }></TextInput>
          <TouchableHighlight
            style={styles.loginBtn}
            onPress={() => {
              this.saveDataFirebase(this.state.ssid, this.state.wifipassword);
            }}>
            <Text style={styles.loginTxt}>Salvar</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.cadastroContainer}>
          <TouchableHighlight
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}>
            <Text style={{color: '#f8606b', fontWeight: 'bold'}}>Cancelar</Text>
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
  txtContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 10,
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
    marginTop: 20,
  },
  loginTxt: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cadastroContainer: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
});
