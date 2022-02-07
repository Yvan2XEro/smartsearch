import { View, ScrollView, TouchableOpacity } from 'react-native';
import {Text} from 'react-native-paper'
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { theme } from '../styles';

const SettingScreen = () => {
  return (
    <View>
      <ScrollView>
        <SettingItem
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
          icon={
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={35}
              color={theme.colors.primary}
            />
          }
          title="Ergonomy"
          description="Test de description"
        />
        <SettingItem
          icon={
            <MaterialCommunityIcons
              name="clipboard-text-play-outline"
              size={35}
              color={theme.colors.primary}
            />
          }
          title="Details docs"
          description="Test de description"
        />
      </ScrollView>
    </View>
  );
};

const SettingItem = ({title, description, icon}:{title: string, description: string, icon: any}) => {
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', alignItems: 'center', padding: 5, borderBottomWidth: .5, borderBottomColor: theme.colors.primary}}>
      <View>{icon}</View>
      <View style={{marginLeft: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', letterSpacing: 0.4}}>
          {title}
        </Text>
        <Text style={{letterSpacing: 0.3}}>{description}</Text>
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
