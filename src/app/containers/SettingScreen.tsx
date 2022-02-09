import { View, ScrollView, TouchableOpacity } from 'react-native';
import {Text} from 'react-native-paper'
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons';

import { theme } from '../styles';

const SettingScreen = ({navigation}:any) => {
  return (
    <View>
      <ScrollView>
        <SettingItem
          onPress={() => navigation.navigate('ProfileScreen')}
          icon={
            <MaterialCommunityIcons
              name="account"
              size={35}
              color={theme.colors.primary}
            />
          }
          title="Account"
          description="Update your profile"
        />
        <SettingItem
          onPress={() => navigation.navigate('KeywordScreen')}
          icon={
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={35}
              color={theme.colors.primary}
            />
          }
          title="Ergonomy"
          description="Modify ergonomic preferences for your app"
        />
        <SettingItem
          onPress={() => navigation.navigate('DetailSettingScreen')}
          icon={
            <MaterialCommunityIcons
              name="clipboard-text-play-outline"
              size={35}
              color={theme.colors.primary}
            />
          }
          title="Displays docs"
          description="Test de description"
        />
        <SettingItem
          onPress={() => navigation.navigate('KeywordScreen')}
          icon={
            <Octicons name="settings" size={35} color={theme.colors.primary} />
          }
          title="Favorite keywords"
          description="Enter keywords for relevant suggestions"
        />
      </ScrollView>
    </View>
  );
};

const SettingItem = ({title, description, icon, onPress}:{title: string, description: string, icon: any, onPress:any}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{flexDirection: 'row', alignItems: 'center', padding: 5, borderBottomWidth: .3, borderBottomColor: theme.colors.primary}}>
      <View>{icon}</View>
      <View style={{marginLeft: 10, flex: .95}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', letterSpacing: 0.4}}>
          {title}
        </Text>
        <Text style={{letterSpacing: 0.3, fontSize: 13, flexWrap: 'wrap'}}>{description}</Text>
      </View>
      <View style={{marginLeft: 'auto'}}>
        <MaterialIcons
          name="arrow-forward-ios"
          size={30}
          color={theme.colors.primary}
        />
      </View>
    </TouchableOpacity>
  );
}

export default SettingScreen;
