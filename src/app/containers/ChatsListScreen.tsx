import * as React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Avatar, Text} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {loggedUserSelector} from '../store/loggedUser/selectors';
import {Chat, Message, User} from '../types';
import moment from 'moment';
import {theme} from '../styles';

const ChatsListScreen = ({navigation}: any) => {
  const user = useSelector(loggedUserSelector);

  const [chats, setChats] = React.useState<Chat[]>([]);
  const compareChats = (a: Chat, b: Chat) => {
    if (
      new Date(a?.lastMessage?.createdAt || '') <
      new Date(b.lastMessage?.createdAt || '')
    ) {
      return 1;
    }

    if (
      new Date(a.lastMessage?.createdAt || '') >
      new Date(b.lastMessage?.createdAt || '')
    ) {
      return -1;
    }
    return 0;
  };
  React.useEffect(() => {
    if (user) {
      const subscriber = firestore()
        .collection('chats')
        .where('usersRefs', 'array-contains', user.pk)
        .onSnapshot(snapshot =>
          setChats(
            snapshot.docs
              .map(item => ({...item.data(), id: item.id} as Chat))
              .filter(item => !!item.lastMessage),
          ),
        );
      return subscriber;
    }
  }, [user]);

  return (
    <View>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Entypo
            onPress={() => navigation.openDrawer()}
            name="menu"
            color="white"
            size={30}
          />
          <View style={{flex: 0.9, marginLeft: 16}}>
            <Text
              style={{
                fontSize: 17,
                textTransform: 'uppercase',
                color: 'white',
              }}>
              Chats
            </Text>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="notifications" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => navigation.replace('SearchUser')}>
          <Ionicons name="ios-search" size={25} color="white" />
          <View>
            <Text style={{marginLeft: 10, marginVertical: 10, color: 'white'}}>
              Search for user...
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <View style={{backgroundColor: '#fff'}}>
        <Text style={{textTransform: 'uppercase', marginLeft: 10}}>
          Online users
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <OnlineItem />
          <OnlineItem />
          <OnlineItem />
          <OnlineItem />
          <OnlineItem />
          <OnlineItem />
          <OnlineItem />
          <OnlineItem />
          <OnlineItem />
          <OnlineItem />
        </ScrollView>
      </View> */}
      <View style={{backgroundColor: '#fefefe'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {chats.sort(compareChats).map((chat, i) => (
            <ChatItem
              key={i}
              onPress={() => navigation.navigate('ChatRoom', {chat})}
              user={
                chat.users[0].pk === user.pk
                  ? (chat.users[1] as User)
                  : (chat.users[0] as User)
              }
              lastMessage={chat.lastMessage}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ChatsListScreen;

const OnlineItem = () => (
  <TouchableOpacity style={{position: 'relative', marginLeft: 5}}>
    <Avatar.Image
      source={{
        uri: 'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527__340.png',
      }}
      size={40}
    />
    <View
      style={{
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'red',
        overflow: 'hidden',
        position: 'absolute',
        bottom: 3,
        right: 3,
      }}
    />
  </TouchableOpacity>
);

const ChatItem = ({
  user,
  onPress,
  lastMessage,
}: {
  user: User;
  onPress: any;
  lastMessage?: Message;
}) => (
  <TouchableOpacity
    style={{
      marginTop: 5,
      borderWidth: 0.1,
      borderColor: '#000',
      padding: 5,
      backgroundColor: '#fcfcfc',
      width: '98%',
      shadowColor: '#000',
      marginBottom: 5,
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      alignSelf: 'center',
    }}
    onPress={onPress}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Avatar.Image source={{uri: user.photoUrl}} size={50} />
      <View style={{position: 'relative', flex: 1}}>
        <Text style={{marginLeft: 20, fontSize: 17}}>
          {user.displayName.length > 20
            ? user.displayName.substring(0, 17) + '...'
            : user.displayName}
        </Text>
        {lastMessage && (
          <>
            <View>
              <Text style={{fontSize: 9, marginLeft: 20, color: '#000'}}>
                {lastMessage?.content.length > 30
                  ? lastMessage?.content.substring(0, 30) + '...'
                  : lastMessage?.content}
              </Text>
            </View>
            <Text
              style={{position: 'absolute', right: 0, bottom: 0, fontSize: 9}}>
              {moment(lastMessage.createdAt).format('DD/MM/YY h:mm')}
            </Text>
          </>
        )}
      </View>
    </View>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  header: {
    paddingLeft: 16,
    shadowColor: '#000',
    minHeight: 50,
    paddingTop: 8,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.colors.primary,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1,
    marginLeft: 15,
  },
  icon: {
    marginLeft: 16,
  },
});
