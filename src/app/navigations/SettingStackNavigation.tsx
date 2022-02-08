import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingScreen from '../containers/SettingScreen';
import KeywordScreen from '../containers/KeywordScreen';
import AppHeader from '../components/AppHeader';
import DetailsHeader from '../components/DetailsHeader';

const Stack = createNativeStackNavigator()

const SettingStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: ({navigation, route, options})=><AppHeader navigation={navigation} title={options.title} />}}
      initialRouteName="SettingScreen">
      <Stack.Screen name="SettingScreen" component={SettingScreen} options={{
        title: "SETTING"
      }} />
      <Stack.Screen name="KeywordScreen" component={KeywordScreen} options={{
        headerShown: false
        // header:({navigation, options})=><DetailsHeader navigation={navigation} title='KEYWORDS' />
      }}/>
    </Stack.Navigator>
  );
};

export default SettingStackNavigation;
