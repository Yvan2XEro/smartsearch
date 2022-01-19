import React, { useEffect, useRef } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore'
import { User } from '../types';
import { Avatar,Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { loggedUserSelector } from '../store/loggedUser/selectors';

const SearchUserScreen = ({navigation}:any) => {
    const [users, setUsers] = React.useState<User[]>([])
    const inputRef = useRef<TextInput>(null);
    const usersQuery = firestore().collection('users').orderBy("email")
    const chatsQuery = firestore().collection('chats');
    const user = useSelector(loggedUserSelector);
    useEffect(() =>{
        inputRef.current?.focus()
    }, [inputRef.current])
    const handleSearch = async(text:string) => {
        await usersQuery.startAt(text).endAt(text+"~").get().then(snapshot=>{
            setUsers(snapshot.docs.map(item=>({...item.data()} as User)))
        });
    }
    const handleInitChat = async (u:User)=> {
        await chatsQuery
          .where('usersRefs', 'array-contains-any', [u.pk, user.uid])
          .get()
          .then(async snapshot => {
            if (snapshot.docs.length == 0) {
                // console.log("ICICICIICIC")
                await chatsQuery
                  .add({
                    usersRefs: [user.uid, u.pk],
                    createdAt: new Date().toISOString(),
                    users: [
                      {
                        pk: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        photoUrl:
                          user.photoUrl ||
                          'https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805__340.png',
                      },
                      u,
                    ],
                  })
                  .then(ref => ref.get().then(chat=>({...chat.data()})))
            } else {
              navigation.navigate('ChatRoom', {
                chat: {...snapshot.docs[0].data(), id: snapshot.docs[0].id},
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
            size={30}
          />
          <TextInput
            ref={inputRef}
            autoFocus={true}
            onChangeText={handleSearch}
            placeholder="Search by email..."
          />
          <TouchableOpacity style={{marginLeft: 'auto'}}>
            <Ionicons
              onPress={() => navigation.navigate('Search')}
              name="ios-search"
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View>
          {users.filter(u=>u.pk!=user.uid).map((u, i) => (
            <TouchableOpacity onPress={()=>handleInitChat(u)} key={i} style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, borderWidth: 0.3, margin:5, borderRadius: 5}}>
              <Avatar.Image source={{uri: u.photoUrl}} size={30} />
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 16}}>{u.displayName}</Text>
                <Text style={{color: 'gray', fontSize: 10}}>{u.email}</Text>
              </View>
              <Ionicons style={{marginLeft: 'auto'}} color="#000" name="arrow-forward" size={25} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
}

export default SearchUserScreen

const styles = StyleSheet.create({})
