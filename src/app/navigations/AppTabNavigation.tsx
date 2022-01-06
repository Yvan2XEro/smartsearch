import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import SearchScreen from '../containers/SearchScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppHeader from '../components/AppHeader';
import ChatStackNavigation from './ChatStackNavigation';
import { StyleSheet, View } from 'react-native'
import HomeScreen from '../containers/HomeScreen';

const Tab = createBottomTabNavigator();
export function AppTabNavigation() {
  const [total, setTotal] = useState(0);
  const handleDataChange = (total: number) => {
    setTotal(total);
  };
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        header: ({navigation, options}) => (
          <AppHeader type="app" navigation={navigation} title={options.title} />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          title: 'SMART SEARCH',
          tabBarIcon: ({color, size, focused}) => (
            <View
              style={[styles.tabBarStyle, focused ? styles.focusedStyles : {}]}>
              <MaterialIcons name="home" color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        children={() => <SearchScreen onDataChange={handleDataChange} />}
        options={{
          tabBarLabel: 'Search',
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <View
              style={[styles.tabBarStyle, focused ? styles.focusedStyles : {}]}>
              <MaterialCommunityIcons
                name="book-search-outline"
                color={color}
                size={size}
              />
            </View>
          ),
          tabBarBadge: total,
        }}
      />
      <Tab.Screen
        name="ChatStack"
        component={ChatStackNavigation}
        options={{
          tabBarLabel: 'Chats',
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => (
            <View
              style={[styles.tabBarStyle, focused ? styles.focusedStyles : {}]}>
              <Ionicons name="chatbubbles-outline" color={color} size={size} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: '100%',
    width: '99%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedStyles: {
    borderTopWidth: 1,
    borderTopColor: 'red'
  }
})