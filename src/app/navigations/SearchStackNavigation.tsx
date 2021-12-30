import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DetailScreen from '../containers/DetailScreen';
import SearchScreen from '../containers/SearchScreen';

const Stack = createNativeStackNavigator();
const SearchStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Details"
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};

export default SearchStackNavigation;
