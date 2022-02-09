import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '../containers/SettingScreen';
import KeywordScreen from '../containers/KeywordScreen';
import AppHeader from '../components/AppHeader';
import DetailsHeader from '../components/DetailsHeader';
import DetailSettingScreen from '../containers/DetailSettingScreen';
import ProfileScreen from '../containers/ProfileScreen';

const Stack = createNativeStackNavigator()

const SettingStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({navigation, route, options}) => (
          <AppHeader navigation={navigation} title={options.title} />
        ),
      }}
      initialRouteName="SettingScreen">
      <Stack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          title: 'SETTING',
        }}
      />
      <Stack.Screen
        name="KeywordScreen"
        component={KeywordScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailSettingScreen"
        component={DetailSettingScreen}
        options={{
          headerShown: false,
          title: 'DOCS DISPLAY',
        }}
      />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default SettingStackNavigation;
