import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import SearchScreen from '../containers/SearchScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppHeader from '../components/AppHeader';

const Tab = createBottomTabNavigator();
const SettingsScreen = ({navigation, route}: {navigation: any; route: any}) => {
  return <Text>This is Settings page using search ontology</Text>;
};

const HomeScreen = ({navigation, route}: {navigation: any; route: any}) => {
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
          header: ({navigation}) => (
            <AppHeader type="app" navigation={navigation} title="Home" />
          ),
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        children={() => <SearchScreen onDataChange={handleDataChange} />}
        options={{
          tabBarLabel: 'Search',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="book-search-outline"
              color={color}
              size={size}
            />
          ),
          tabBarBadge: total,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          header: ({navigation}) => (
            <AppHeader navigation={navigation} title="Settings" type="app" />
          ),
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="settings-display" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
