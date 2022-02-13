import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text, Avatar, TextInput} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import {Chat, Message} from '../types';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {loggedUserSelector} from '../store/loggedUser/selectors';
import {theme} from '../styles'
import {SelectableText} from '@astrocoders/react-native-selectable-text';
import { AppClipBoard, Notification } from '../services';

const ChatRoomScreen = ({navigation, route}: any) => {
  const user = useSelector(loggedUserSelector);
  const [chat, setChat] = useState(route.params.chat as Chat);
  const chatSnduser =
    chat.users[0].pk === user.pk ? chat.users[1] : chat.users[0];
  const avatarUrl =
    'https://cdn.pixabay.com/photo/2017/07/18/23/54/peasants-2517476__340.jpg';
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const isMyMessage = (message: Message): boolean => {
    return message.userRef === user.pk;
  };

  const handleSendMessage = async () => {
    if (message.trim().length > 0) {
      const data = {
        userRef: user.pk,
        chatRef: chat.id,
        received: false,
        readed: false,
        content: message,
        createdAt: new Date().toISOString(),
        sent: true,
      };
      setMessage('');

      await firestore()
        .collection('messages')
        .add(data)
        .then(() => {
          listRef.current?.scrollToEnd();
          firestore().collection('chats').doc(chat.id).update({lastMessage:data})
        });
    }
  };

  const formatDate = (date: string): string => {
    return moment(date).format('DD-MM-YYYY h:mm');
  };

  const compareMsg = (a: any, b: any) => {
    if (new Date(a.createdAt) < new Date(b.createdAt)) {
      return -1;
    }

    if (new Date(a.createdAt) > new Date(b.createdAt)) {
      return 1;
    }
    return 0;
  };

  useEffect(() =>{
    return firestore().collection('chats').doc(chat.id).onSnapshot(snapshot=>{
      setChat({...snapshot.data(), id: snapshot.id}as Chat);
    })
  }, [])

  const [refetchCount, setRefetchCount]= useState(0)
  const messagesQuery = firestore()
    .collection('messages')
    .where('chatRef', '==', chat.id);
  useEffect(() => {
    return messagesQuery.onSnapshot(snapshot => {
      if (refetchCount === 0) setRefetchCount(p => p + 1);
      else if (snapshot.docs.length > messages.length && chat.lastMessage?.userRef!=user.pk) {
        Notification.push('You have a new message!', 'Messages');
      }
      setMessages(
        snapshot.docs
          .map(
            change =>
              ({
                ...change.data(),
                id: change.id,
              } as Message),
          )
          .filter(m => m.chatRef == chat.id),
      );
    });
  }, []);

  const listRef = useRef<FlatList>(null);

  return (
    <View style={{height: '100%'}}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Ionicons
            onPress={() => navigation.replace('ChatsList')}
            name="arrow-back"
            color="white"
            size={30}
          />
          <View
            style={{flex: 0.95, flexDirection: 'row', alignItems: 'center'}}>
            <Avatar.Image
              style={{marginLeft: 5}}
              source={{
                uri: chatSnduser.photoUrl,
              }}
              size={30}
            />
            <View style={{marginLeft: 20}}>
              <Text
                style={{
                  fontSize: 15,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  color: 'white',
                  letterSpacing: 0.5,
                  textAlign: 'center',
                }}>
                {chatSnduser.displayName}
              </Text>
              <Text
                style={{textAlign: 'center', fontSize: 12, letterSpacing: 0.5}}>
                Online
              </Text>
            </View>
          </View>
          <TouchableOpacity style={{marginLeft: 'auto'}}>
            <Entypo name="dots-three-vertical" color="white" size={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 5, marginBottom: 116}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ref={listRef}
          data={messages.sort(compareMsg)}
          keyExtractor={({id}, index) => id || '' + index}
          renderItem={({item}: {item: Message}) => (
            <TouchableOpacity
              style={[
                styles.item,
                isMyMessage(item) ? styles.rightItem : styles.leftItem,
              ]}>
              {/* {!isMyMessage(item) && (
                <Avatar.Image
                  style={[styles.image, {left: -10}]}
                  source={{
                    uri: chatSnduser.photoUrl,
                  }}
                  size={30}
                />
              )} */}
              <View style={styles.text}>
                <SelectableText
                  style={{color: 'black'}}
                  menuItems={['Copy', 'Cut']}
                  onSelection={({content, eventType}) => {
                    AppClipBoard.setString(content);
                  }}
                  value={item.content}
                />
                <Text style={{fontSize: 8}}>{formatDate(item.createdAt)}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          marginBottom: 10,
          paddingBottom: 5,
          paddingHorizontal: 7,
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderRadius: 20,
          justifyContent: 'center',
          width: '95%',
          alignSelf: 'center',
          shadowColor: 'rgb(0, 0, 0)',
          shadowOffset: {
            width: 3,
            height: 3,
          },
          shadowOpacity: 0.5,
          overflow: 'hidden',
          shadowRadius: 5,
          elevation: 2,
        }}>
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          theme={{
            ...theme,
            colors: {
              ...theme.colors,
              primary: theme.colors.surface,
              disabled: theme.colors.surface,
            },
          }}
          multiline={true}
          numberOfLines={2}
          style={{
            flex: 0.85,
            backgroundColor: theme.colors.surface,
            maxHeight: 100,
            borderRadius: 5,
            borderBottomColor: theme.colors.surface,
            color: theme.colors.text,
          }}
          placeholder="Type message..."
        />
        <TouchableOpacity
          style={{flex: 0.15, marginLeft: 5, justifyContent: 'center'}}
          onPress={handleSendMessage}>
          <Feather
            style={{alignSelf: 'center', marginTop: 5}}
            name="send"
            color={theme.colors.primary}
            size={30}
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
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.colors.primary,
  },
  item: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    maxWidth: '80%',
    marginBottom: 3,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
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
    borderTopRightRadius: 10,
  },
  rightItem: {
    marginLeft: 'auto',
    borderTopLeftRadius: 10
  },
  text: {
    marginHorizontal: 5,
    marginLeft: 15,
  }
});
