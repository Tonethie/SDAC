import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {ListItem, CheckBox} from 'native-base';
import * as firebase from 'firebase/app';
import auth from 'firebase/auth';
/**
 * Profile screen
 */
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }

  signUpUser = (name, email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((authenticate) => {
        /*return authenticate.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {*/
        this.props.navigation.navigate('Home');
        //});
      })
      .catch((error1) => {
        alert(error1.message);
      });
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.campos}>
          <Text style={styles.titulo}>Cadastro</Text>
          <Text style={styles.corTexto}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome"
            underlineColorAndroid="gray"
            onChangeText={(name) => this.setState({name})}></TextInput>
          <Text style={styles.corTexto}>{'\n'}Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu email"
            underlineColorAndroid="gray"></TextInput>
          <Text style={styles.corTexto}>{'\n'}Confirmar Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu email"
            underlineColorAndroid="gray"
            onChangeText={(email) => this.setState({email})}></TextInput>
          <Text style={styles.corTexto}>{'\n'}Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Sua senha"
            underlineColorAndroid="gray"
            secureTextEntry={true}></TextInput>
          <Text style={styles.corTexto}>{'\n'}Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Sua senha"
            underlineColorAndroid="gray"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}></TextInput>
          <ListItem style={{width: 250, marginBottom: 10}}>
            <CheckBox
              style={{marginRight: 20}}
              color="#f8606b"
              checked={false}
            />
            <Text style={{color: '#334048', fontWeight: 'bold', fontSize: 12}}>
              Eu concordo com os
              <Text style={styles.corTermos}>
                {' '}
                Termos de Serviços e Política de Privacidade.
              </Text>
            </Text>
          </ListItem>
          <TouchableHighlight
            onPress={() => {
              this.signUpUser(
                this.state.name,
                this.state.email,
                this.state.password,
              );
            }}
            style={styles.loginBtn}>
            <Text style={styles.loginTxt}>Continuar</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.temContaContainer}>
          <Text style={{color: '#b3bdc4', fontWeight: 'bold', fontSize: 12}}>
            Tem uma conta? <Text style={styles.corTermos}> Logar</Text>
          </Text>
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
  campos: {
    justifyContent: 'center',
    paddingLeft: 50,
  },
  titulo: {
    color: '#334048',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 50,
  },
  corTexto: {
    color: '#f8606b',
    fontSize: 16,
    fontWeight: 'bold',
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
  corTermos: {
    color: '#f8606b',
    fontSize: 12,
    fontWeight: 'bold',
  },
  temContaContainer: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});
