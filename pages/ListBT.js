import React from 'react';
import { Alert, Image, View, Text } from 'react-native';
import { Card, Title, Paragraph, Button} from 'react-native-paper'
import * as firebase from 'firebase/app';
import auth from 'firebase/auth';
import database from 'firebase/database';



export default class ListBT extends React.Component {

    constructor(props){
        super(props)
        this.taskRef = firebase.database()
                                .ref('/users/' + firebase.auth().currentUser.uid + '/bt_data');

        this.state = {
            items: [],
        }
    }
    componentDidMount(){
        this.readUserData(this.taskRef);
    }

    readUserData(taskRef){
        taskRef.on('value', (snap) => {
            var items = [];
            snap.forEach((childSnap) => {
                items.push({
                    key: childSnap.key,
                    nome: childSnap.val().nomebt
                })
            })
            this.setState({items:items});
        });
    }
    
    render(){
        return(
             <View>
                {
                this.state.items.map((item, index)=>{
                    if((item.nome).charAt(0) == 'e'){
                        return (
                            <Card key={index} onPress={() => Alert.alert("Configurar bluetooth?")}>
                                <Card.Content style={{flexDirection: 'row', alignItems:"center"}}>
                                    <Image
                                        source={{uri: 'https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/004/118/original/smart-tv.png'}}
                                        style={{width:30, height: 30}}
                                        />
                                    <Text>  {item.nome}</Text>
                                </Card.Content>
                            </Card>
                        );

                    }
                    return (
                        <Card key={index} onPress={() => Alert.alert("Configurar bluetooth?")}>
                            <Card.Content style={{flexDirection: 'row', alignItems:"center"}}>
                                <Image
                                    source={{uri: 'https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/004/124/original/smartphone.png'}}
                                    style={{width:30, height: 30}}
                                    />
                                <Text>  {item.nome}</Text>
                            </Card.Content>
                        </Card>
                    );
                })
                }
            </View>
        );
    }
}
