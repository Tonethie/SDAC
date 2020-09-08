import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  CheckBox,
} from 'react-native';
import {ListItem} from 'native-base';
import * as firebase from 'firebase/app';
import auth from 'firebase/auth';
import database from 'firebase/database';
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
      confirmemail: '',
      confirmpassword: '',
    };
  }

  signUpUser = (
    name,
    email,
    password,
    confirmemail,
    confirmpassword,
    checked,
  ) => {
    if (email != confirmemail) {
      alert('Os emails digitados não combinam.');
      return;
    } else if (password != confirmpassword) {
      alert('As senhas digitadas não combinam.');
      return;
    } else if (checked != true) {
      alert(
        'Você deve aceitar os Termos de Serviços e a Política de Privacidade.',
      );
      return;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((authenticate) => {
          this.props.navigation.navigate('Home');
          firebase
            .database()
            .ref('/users/' + firebase.auth().currentUser.uid)
            .set({
              uid: firebase.auth().currentUser.uid,
              nome: name,
              email1: confirmemail,
            })
            .then(() => console.log('Data set.'));
        })
        .catch((error1) => {
          alert(error1.message);
        });
    }
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
            underlineColorAndroid="gray"
            onChangeText={(email) => this.setState({email})}></TextInput>
          <Text style={styles.corTexto}>{'\n'}Confirmar Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu email"
            underlineColorAndroid="gray"
            onChangeText={(confirmemail) =>
              this.setState({confirmemail})
            }></TextInput>
          <Text style={styles.corTexto}>{'\n'}Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Sua senha"
            underlineColorAndroid="gray"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}></TextInput>
          <Text style={styles.corTexto}>{'\n'}Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Sua senha"
            underlineColorAndroid="gray"
            secureTextEntry={true}
            onChangeText={(confirmpassword) =>
              this.setState({confirmpassword})
            }></TextInput>
          <ListItem style={{width: 250, marginBottom: 10}}>
            <CheckBox
              value={this.state.checked}
              onValueChange={() =>
                this.setState({checked: !this.state.checked})
              }
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
                this.state.confirmemail,
                this.state.confirmpassword,
                this.state.checked,
              );
            }}
            style={styles.loginBtn}>
            <Text style={styles.loginTxt}>Continuar</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.temContaContainer}>
          <Text style={{color: '#b3bdc4', fontWeight: 'bold', fontSize: 12}}>
            Tem uma conta?{' '}
            <Text
              style={styles.corTermos}
              onPress={() => {
                this.props.navigation.navigate('SignIn');
              }}>
              {' '}
              Logar
            </Text>
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
