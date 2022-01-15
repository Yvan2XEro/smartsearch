import * as React from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import {AuthenticationContext} from '../contexts/AuthContextProvider';

const ChatsListScreen = ({navigation}: any) => {
  const {user} = React.useContext(AuthenticationContext);
  const [chats, setChats] = React.useState<any[]>([]);
  const [buildedChats, setBuildedChats] = React.useState<any[]>([]);

  const sndChatUser = (chat: any): string => {
    return chat.usersRefs[0] == user.uid
      ? chat.usersRefs[1]
      : chat.usersRefs[0];
  };

  const fetchUsers = async (usersIds: string[]) => {
    await firestore()
      .collection('users')
      .where('pk', 'in', usersIds)
      .get()
      .then(querySnapshot => {
        const users = querySnapshot.docs.map(u => u.data());
        // console.log('USERS:', users);
        let bChats: any[] = [];
        chats.forEach(chat => {
          const u = users.find(({pk}) => pk == chat.user);
          bChats.push({...chat, user: u});
        });
        console.log(bChats);
        // console.log(chats);
        setBuildedChats(bChats);
      });
  };

  React.useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .where('usersRefs', 'array-contains', user.uid)
      .get()
      .then(async querySnapshot => {
        await fetchUsers(
          querySnapshot.docs.map(item => sndChatUser(item.data())),
        );
        setChats(
          querySnapshot.docs.map(item => ({
            ...item.data(),
            id: item.id,
            user: sndChatUser(item.data()),
          })),
        );
      });
  }, []);

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
            size={30}
          />
          <View style={{flex: 0.9, marginLeft: 16}}>
            <Text style={{fontSize: 17, textTransform: 'uppercase'}}>
              Chats
            </Text>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="notifications" size={25} />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="ios-search" size={25} />
          <TextInput
            placeholder="Search for user..."
            keyboardType="web-search"
          />
        </View>
      </View>
      <View style={{backgroundColor: '#fff'}}>
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
      </View>
      <View style={{backgroundColor: '#fefefe'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {buildedChats.map((chat, i) => (
            <ChatItem
              key={i}
              onPress={() => navigation.navigate('ChatRoom', {chat})}
              user={chat.user}
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

const ChatItem = ({user, onPress}: any) => (
  <TouchableOpacity
    style={{
      marginTop: 10,
      borderWidth: 0.1,
      borderColor: '#000',
      padding: 5,
      backgroundColor: '#fcfcfc',
      borderRadius: 3,
      width: '98%',
      alignSelf: 'center',
    }}
    onPress={onPress}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Avatar.Image
        source={{
          uri: user.photoURL
            ? user.photoURL
            : 'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527__340.png',
        }}
        size={50}
      />
      <Text style={{marginLeft: 20, fontSize: 17}}>{user.displayName}</Text>
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
    backgroundColor: '#fff',
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
