import React, {useEffect, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {User} from '../types';
import {Avatar, Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {loggedUserSelector} from '../store/loggedUser/selectors';
import {theme} from '../styles';

const SearchUserScreen = ({navigation}: any) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const inputRef = useRef<TextInput>(null);
  const usersQuery = firestore().collection('users').orderBy('email');
  const chatsQuery = firestore().collection('chats');
  const user = useSelector(loggedUserSelector);
  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef.current]);
  const handleSearch = async (text: string) => {
    if (text.length > 0) {
      await usersQuery
        .startAt(text)
        .endAt(text + '~')
        .get()
        .then(snapshot => {
          setUsers(snapshot.docs.map(item => ({...item.data()} as User)));
        });
    }
  };
  const handleInitChat = async (u: User) => {
    await chatsQuery
      .where('usersRefs', 'array-contains', user.pk)
      .get()
      .then(async snapshot => {
        const chat = snapshot.docs
          .map(item => ({...item.data(), id: item.id} as any))
          .find(c => c.usersRefs.indexOf(u.pk) !== -1);
        if (snapshot.docs.length === 0 || chat === undefined) {
          await chatsQuery
            .add({
              usersRefs: [user.pk, u.pk],
              createdAt: new Date().toISOString(),
              users: [user, u],
            })
            .then(ref =>
              ref.get().then(chat =>
                navigation.navigate('ChatRoom', {
                  chat: {...chat.data(), id: chat.id},
                }),
              ),
            );
        } else {
          navigation.navigate('ChatRoom', {
            chat,
          });
        }
      });
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          paddingTop: 5,
        }}>
        <Ionicons
          onPress={() => navigation.replace('ChatsList')}
          name="arrow-back"
          color={theme.colors.primary}
          size={30}
        />
        <TextInput
          ref={inputRef}
          style={{color: theme.colors.text}}
          autoFocus={true}
          onChangeText={handleSearch}
          placeholder="Search by email..."
        />
        <TouchableOpacity style={{marginLeft: 'auto'}}>
          <Ionicons name="ios-search" size={25} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {users
          .filter(u => u.pk != user.pk)
          .map((u, i) => (
            <TouchableOpacity
              onPress={() => handleInitChat(u)}
              key={i}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
                paddingVertical: 3,
                borderWidth: 0.3,
                borderColor: theme.colors.primary,
                margin: 5,
                borderRadius: 5,
              }}>
              <Avatar.Image source={{uri: u.photoUrl}} size={35} />
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 16}}>{u.displayName}</Text>
                <Text style={{color: 'gray', fontSize: 10}}>{u.email}</Text>
              </View>
              <Ionicons
                style={{marginLeft: 'auto'}}
                color={theme.colors.primary}
                name="arrow-forward"
                size={25}
              />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default SearchUserScreen;

const styles = StyleSheet.create({});
