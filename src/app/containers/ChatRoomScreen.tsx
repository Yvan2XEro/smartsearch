import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {Message} from '../types';
import {AuthenticationContext} from '../contexts/AuthContextProvider';
import moment from 'moment';

const ChatRoomScreen = ({navigation, route}: any) => {
  const {user} = useContext(AuthenticationContext);
  const {chat} = route.params;
  const avatarUrl = chat.user.photoURL
    ? chat.user.photoURL
    : 'https://cdn.pixabay.com/photo/2017/07/18/23/54/peasants-2517476__340.jpg';
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [inittializing, setInitializing] = useState(true);
  const isMyMessage = (message: Message): boolean => {
    return message.userRef === user.uid;
  };
  const handleSendMessage = async () => {
    if (message.trim().length > 0) {
      const data = {
        userRef: user.uid,
        chatRef: chat.id,
        received: false,
        readed: false,
        content: message,
        createdAt: new Date().toISOString(),
        sent: true,
      };
      setMessage('');

      await firestore().collection('messages').add(data);
    }
  };
  const formatDate = (date: string): string => {
    return moment(date).format('DD-MM-YYYY h:mm:ss');
  };

  const compareMsg = (a: any, b: any) => {
    if (new Date(a.createdAt) < new Date(b.createdAt)) return -1;

    if (new Date(a.createdAt) > new Date(b.createdAt)) return 1;
    return 0;
  };
  
  const messagesQuery = firestore()
    .collection('messages')
    .where('chatRef', '==', chat.id);
  useEffect(() => {
    if (!inittializing) {
      messagesQuery.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == 'added' && change.doc.data().chatRef === chat.id) {
            const data: any = {
              ...change.doc.data(),
              id: change.doc.id,
              createdAt: formatDate(change.doc.data().createdAt),
            };
            setMessages([...messages, data]);
          }
        });
      });
    } else {
      setInitializing(false);
      messagesQuery.get().then(docSnapshot => {
        setMessages(
          docSnapshot.docs.map(change => ({
            ...change.data(),
            id: change.id,
          })),
        );
      });
    }
  }, []);
  return (
    <View style={{height: '100%'}}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={30}
          />
          <View style={{flex: 0.9, marginLeft: 16}}>
            <Text
              style={{
                fontSize: 17,
                textTransform: 'uppercase',
                textAlign: 'center',
              }}>
              {chat.user.displayName}
            </Text>
            <Text style={{textAlign: 'center', fontSize: 12}}>Online</Text>
          </View>
          <TouchableOpacity style={{marginLeft: 'auto'}}>
            <Entypo name="dots-three-vertical" color="gray" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 5, paddingBottom: 115}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {messages.sort(compareMsg).map((m, i) => (
            <TouchableOpacity
              style={[
                styles.item,
                isMyMessage(m) ? styles.rightItem : styles.leftItem,
              ]}
              key={i}>
              {!isMyMessage(m) && (
                <Avatar.Image
                  style={[styles.image, {left: -10}]}
                  source={{
                    uri: avatarUrl,
                  }}
                  size={30}
                />
              )}
              <View style={styles.text}>
                <Text style={{color: 'black'}}>{m.content}</Text>
                <Text style={{fontSize: 8}}>{m.createdAt}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          marginBottom: 0,
          padding: 3,
          paddingBottom: 10,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          style={[styles.textInput]}
          placeholder="Type message..."
        />
        <TouchableOpacity
          style={{flex: 0.15, marginLeft: 5}}
          onPress={handleSendMessage}>
          <FontAwesome
            style={{alignSelf: 'center', marginTop: 5}}
            name="send-o"
            // color={theme.colors.primary}
            size={40}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRoomScreen;

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
    maxWidth: '80%',
    marginBottom: 3,
    borderRadius: 10,
    padding: 5,
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
