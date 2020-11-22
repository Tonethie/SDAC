import React from 'react';
import {Alert, Image ,View, Text} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase/app';
import auth from 'firebase/auth';
import database from 'firebase/database';
import BluetoothSerial from 'react-native-bluetooth-serial-next'

var SendIntentAndroid = require("react-native-send-intent");
var RNFS = require('react-native-fs')

export default class ListBT extends React.Component {
  constructor(props) {
    super(props);
    this.taskRef = firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid + '/bt_data');

    this.state = {
      items: [],
      mac: '',
    };
  }
  componentDidMount() {
    this.readUserData(this.taskRef);
  }

  readUserData(taskRef) {
    taskRef.on('value', (snap) => {
      var items = [];
      snap.forEach((childSnap) => {
        items.push({
          key: childSnap.key,
          nome: childSnap.val().nomebt,
          mac: childSnap.val().mac,
        });
      });
      this.setState({items: items});
    });
  }
  deleteUserData(key) {
    let btRem = firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid + '/bt_data/' + key);
    btRem.remove().catch((error) => alert(error.message));
  }

  onShare = async () =>{
    try{     
      
      await BluetoothSerial.pairDevice(this.state.mac);
      setTimeout(this.SendWFDados, 10000)
    }catch(error){
      alert(error.message);
    }
  };

  SendWFDados = async () =>{
    SendIntentAndroid.sendText({
      text: "wifiDados",
      type: SendIntentAndroid.TEXT_JSON,
    });
  }

  render() {
    return (
      <View>
        {this.state.items.map((item, index) => {
          if (item.nome.charAt(0) == 'e') {
            return (
              <Card
                key={index}
                onPress={() =>
                  Alert.alert('Configurar',
                  'Configurar Wifi - ' + item.nome + '?',
                  [
                    {
                      text: 'Sim',
                      onPress: () => {this.setState({mac: item.mac}); this.onShare();}
                    },
                    {
                      text: 'Cancelar',
                      onPress: () => console.log('Cancelado'),
                      style: 'cancel',
                    },
                  ],
                  )
                }>
                <Card.Content
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{
                      uri:
                        'https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/004/118/original/smart-tv.png',
                    }}
                    style={{width: 30, height: 30}}
                  />
                  <Text> {item.nome + " - " + item.mac}</Text>
                  <Button
                    style={{position: 'absolute', right: 0}}
                    icon={({black, size}) => (
                      <Icon
                        name="dots-horizontal"
                        color={'#f8606b'}
                        size={size}
                      />
                    )}
                    onPress={() =>
                      Alert.alert(
                        'Excluir',
                        'Deseja deletar o bluetooth da lista?',
                        [
                          {
                            text: 'Sim',
                            onPress: () => this.deleteUserData(item.key),
                          },
                          {
                            text: 'Cancelar',
                            onPress: () => console.log('Cancelado'),
                            style: 'cancel',
                          },
                        ],
                      )
                    }></Button>
                </Card.Content>
              </Card>
            );
          }
          return (
            <Card
              key={index}
              onPress={() =>
                Alert.alert('Configurar',
                'Configurar Wifi - ' + item.nome + '?\n' + item.mac,
                [
                  {
                    text: 'Sim',
                    onPress: () => {this.setState({mac: item.mac}); this.onShare();},
                  },
                  {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancelado'),
                    style: 'cancel',
                  },
                ],
                )
              }>
              <Card.Content
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{
                    uri:
                      'https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/004/124/original/smartphone.png',
                  }}
                  style={{width: 30, height: 30}}
                />
                <Text> {item.nome}</Text>
                <Button
                  style={{position: 'absolute', right: 0}}
                  icon={({black, size}) => (
                    <Icon
                      name="dots-horizontal"
                      color={'#f8606b'}
                      size={size}
                    />
                  )}
                  onPress={() =>
                    Alert.alert(
                      'Excluir',
                      'Deseja deletar o bluetooth da lista?',
                      [
                        {
                          text: 'Sim',
                          onPress: () => this.deleteUserData(item.key),
                        },
                        {
                          text: 'Cancelar',
                          onPress: () => console.log('Cancelado'),
                          style: 'cancel',
                        },
                      ],
                    )
                  }></Button>
              </Card.Content>
            </Card>
          );
        })}
      </View>
    );
  }
}
