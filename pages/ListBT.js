import React from 'react';
import {Alert, Image, AsyncStorage ,View, Text} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase/app';
import auth from 'firebase/auth';
import database from 'firebase/database';
import BluetoothSerial from 'react-native-bluetooth-serial-next';
import { connect} from 'react-native-bluetooth-serial-next';

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

  conectarBluetooth = async() =>{
    //alert(this.state.mac)
    const tvDevice = BluetoothSerial.device(this.state.mac);
    await tvDevice.connect();
    const conectado =  await BluetoothSerial.isConnected();
    alert(conectado);
    if (conectado) {
      await tvDevice.read((data, subscription) => {
        let ReadSubscription = subscription;
        console.log("Data: ", data)
      });
    }
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
                      onPress: () => {this.setState({mac: item.mac}); this.conectarBluetooth();}
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
          }
          return (
            <Card
              key={index}
              onPress={() =>
                Alert.alert('Configurar',
                'Configurar Wifi - ' + item.nome + '?',
                [
                  {
                    text: 'Sim',
                    onPress: () => {this.setState({mac: item.mac}); this.conectarBluetooth();},
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
