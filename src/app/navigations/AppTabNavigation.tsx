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

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  return <Text>This is home page</Text>;
};
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
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          header: ({ navigation }) => (
            <AppHeader type="app" navigation={navigation} title="Home" />
          ),
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabBarStyle}>
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
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabBarStyle}>
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
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabBarStyle}>
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
  }
})