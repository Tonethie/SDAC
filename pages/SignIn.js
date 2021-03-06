import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import * as firebase from 'firebase/app';
import auth from 'firebase/auth';
/**
 * SignIn
 */
export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  signInUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((authenticate) => {
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={{uri: 'https://i.imgur.com/UdmxQVQ.png'}}
            style={styles.logoImg}
          />
          <Text style={styles.logoText}>{'\n'}SDAC</Text>
          <Text style={styles.logoText}>Inovando sua Conexão</Text>
        </View>
        <View style={styles.campos}>
          <Text style={styles.titulo}>Entrar</Text>
          <Text style={styles.corTexto}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu email"
            underlineColorAndroid="gray"
            onChangeText={(email) => this.setState({email})}></TextInput>
          <Text style={styles.corTexto}>{'\n'}Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Sua senha"
            secureTextEntry={true}
            underlineColorAndroid="gray"
            onChangeText={(password) => this.setState({password})}></TextInput>
          <TouchableHighlight
            onPress={() => {
              this.signInUser(this.state.email, this.state.password);
            }}
            style={styles.loginBtn}>
            <Text style={styles.loginTxt}>Entrar</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.cadastroContainer}>
          <TouchableHighlight>
            <Text style={{color: '#b3bdc4', fontWeight: 'bold'}}>
              Esqueceu a senha?
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={{marginTop: 40, color: '#f8606b', fontWeight: 'bold'}}>
              Cadastre-se
            </Text>
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
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  logoImg: {
    width: 140,
    height: 140,
  },
  logoText: {
    color: '#b3bdc4',
    fontSize: 16,
    fontWeight: 'bold',
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
  cadastroContainer: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});
