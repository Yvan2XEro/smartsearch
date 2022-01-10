import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore'
import { AuthenticationContext } from '../contexts/AuthContextProvider';

const ChatRoomScreen = ({ navigation, route }: any) => {
    const {user} = useContext(AuthenticationContext)
    const { chat } = route.params
    const [messages, setMessages] = useState([])

    const handleSend = (message: IMessage[])=>{
      firestore()
        .collection('chats')
        .doc(Date.now().toString())
        .set(messages[0]);
    };
    useEffect(() =>{
        const subscriber = firestore().collection("chats").onSnapshot((snapshot)=>{
            snapshot.docChanges().forEach(change=>{
                if(change.type == 'added') {
                    const data:any = {
                      ...change.doc.data(),
                      createdAt: change.doc.data().createdAt.toDate(),
                    };
                    setMessages((prevMessages)=>GiftedChat.append(prevMessages, data))
                }
            })
        })
        return subscriber
    }, [])
    return (
      <View style={{height: '100%'}}>
        <GiftedChat
          messages={messages}
          onSend={messages => handleSend(messages)}
          user={{_id: user.id}}
        />
      </View>
    );
}

export default ChatRoomScreen

const styles = StyleSheet.create({
    header: {
        paddingLeft: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff',
    },

    image: {
        position: 'absolute',
        top: -0,
    },
    item: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        marginBottom: 3,
        borderRadius: 10,
        padding: 5,
        width: '75%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 30,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3.41,
        elevation: 5,
    },
    leftItem: {
        marginRight: 'auto',
        backgroundColor: '#efeef5',
    },
    rightItem: {
        marginLeft: 'auto',
    },
    text: {
        marginHorizontal: 5,
        marginLeft: 15,
    },
    textInput: {
        flex: 0.85,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
    },
});
