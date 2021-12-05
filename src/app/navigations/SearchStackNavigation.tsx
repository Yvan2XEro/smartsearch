import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AppHeader from '../components/AppHeader';
import DetailScreen from '../containers/DetailScreen';
import SearchScreen from '../containers/SearchScreen';

const Stack = createNativeStackNavigator();
const SearchStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        options={{
          header: ({navigation}) => (
            <AppHeader navigation={navigation} title="Details" type="back" />
          ),
        }}
        name="Details"
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};

export default SearchStackNavigation;
