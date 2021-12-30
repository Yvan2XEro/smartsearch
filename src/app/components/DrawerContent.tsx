import { DrawerContentScrollView } from '@react-navigation/drawer'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Text as PText } from 'react-native-paper'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomDrawerItem from './CustomDrawerItem';

const DrawerContent = ({navigation}:{navigation:any}) => {
    return (
      <DrawerContentScrollView>
        <View
          style={{
            flexDirection: 'row',
            margin: 10,
            marginTop: 20,
            alignSelf: 'center',
          }}>
          <Avatar.Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805__340.png',
            }}
            style={{backgroundColor: '#fff'}}
          />
          <View>
            <PText style={{fontSize: 17, textAlign: 'center'}}>
              Super User
            </PText>
            <Text style={{fontSize: 13}}>Une description de l'user</Text>
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <CustomDrawerItem
            label="Home"
            icon={<SimpleLineIcons name="home" size={draweIconSize} />}
            onPress={() => navigation.navigate('Home')}
          />
          <CustomDrawerItem
            label="Saved documents"
            icon={<FontAwesome name="folder" size={draweIconSize} />}
            onPress={() => navigation.navigate('Home')}
          />
          <CustomDrawerItem
            label="Settings"
            icon={<SimpleLineIcons name="settings" size={draweIconSize} />}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
        <View style={{marginTop: 20}}>
          <CustomDrawerItem
            label="Logout"
            icon={<Ionicons name="md-exit-outline" size={draweIconSize} />}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </DrawerContentScrollView>
    );
}

export default DrawerContent

const draweIconSize = 25

const styles = StyleSheet.create({})
