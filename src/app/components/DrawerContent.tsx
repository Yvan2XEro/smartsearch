import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Text as PText} from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AuthenticationContext} from '../contexts/AuthContextProvider';
import {useSelector} from 'react-redux';
import { theme } from '../styles';

const DrawerContent = ({navigation}: {navigation: any}) => {
  const {logout} = React.useContext(AuthenticationContext);
  const user = useSelector(({loggedUser}: any) => loggedUser);
  return (
    <DrawerContentScrollView>
      {user && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginTop: 0,
              padding: 10,
              paddingTop: 20,
              alignSelf: 'center',
            }}>
            <Avatar.Image
              source={{
                uri: user.photoUrl,
              }}
              size={50}
              style={{backgroundColor: '#fff'}}
            />
            <View style={{marginLeft: 25}}>
              <PText
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                }}>
                {user.displayName ? user.displayName : user.email}
              </PText>
              <PText style={{fontSize: 13}}>Une description de l'user</PText>
            </View>
          </View>
          <Divider />
          <View style={{marginTop: 10}}>
            <CustomDrawerItem
              label="Home"
              icon={
                <SimpleLineIcons
                  name="home"
                  size={draweIconSize}
                  color={theme.colors.primary}
                />
              }
              onPress={() => navigation.navigate('Home')}
            />
            <CustomDrawerItem
              label="Saved documents"
              icon={
                <FontAwesome
                  name="folder"
                  size={draweIconSize}
                  color={theme.colors.primary}
                />
              }
              onPress={() => navigation.navigate('SavedDocsStack')}
            />
            <CustomDrawerItem
              label="Shareds"
              icon={
                <SimpleLineIcons
                  name="share-alt"
                  size={draweIconSize}
                  color={theme.colors.primary}
                />
              }
              onPress={() => navigation.navigate('SharedScreen')}
            />
            <CustomDrawerItem
              label="Groups"
              icon={
                <FontAwesome5
                  name="users"
                  size={draweIconSize}
                  color={theme.colors.primary}
                />
              }
              onPress={() => navigation.navigate('Home')}
            />
            <CustomDrawerItem
              label="Settings"
              icon={
                <SimpleLineIcons
                  name="settings"
                  size={draweIconSize}
                  color={theme.colors.primary}
                />
              }
              onPress={() => navigation.navigate('Settings')}
            />
            <CustomDrawerItem
              label="Help"
              icon={
                <MaterialIcons
                  name="help"
                  size={draweIconSize}
                  color={theme.colors.primary}
                />
              }
              onPress={() => navigation.navigate('Home')}
            />
          </View>
          <Divider />
          <View style={{marginTop: 20}}>
            <CustomDrawerItem
              label="Logout"
              icon={
                <Ionicons
                  name="md-exit-outline"
                  size={draweIconSize}
                  color={theme.colors.primary}
                />
              }
              onPress={logout}
            />
          </View>
        </View>
      )}
    </DrawerContentScrollView>
  );
};

function Divider() {
  return (
    <View
      style={{
        height: 0.5,
        backgroundColor: theme.colors.primary,
        marginTop: 10,
      }}
    />
  );
}

const CustomDrawerItem = ({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: string;
  onPress: any;
}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <DrawerItem
        icon={({}) => icon}
        style={{flex: 0.9}}
        labelStyle={{fontSize: 13, color: theme.colors.primary, fontWeight: 'bold'}}
        label={label}
        onPress={onPress}
      />
      <SimpleLineIcons
        name="arrow-right"
        size={18}
        color={theme.colors.primary}
        style={{alignSelf: 'center'}}
      />
    </View>
  );
};


export default DrawerContent;

const draweIconSize = 25;

const styles = StyleSheet.create({});
