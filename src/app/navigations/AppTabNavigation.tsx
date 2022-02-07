import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import SearchScreen from '../containers/SearchScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppHeader from '../components/AppHeader';
import ChatStackNavigation from './ChatStackNavigation';
import {Dimensions, StyleSheet, View} from 'react-native';
import HomeScreen from '../containers/HomeScreen';
import { theme } from '../styles';

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
        // tabBarActiveTintColor: '#e91e63',
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          borderTopColor: '#fff',
          overflow: 'hidden',
          width: windowWidth,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
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
          tabBarIcon: ({focused, size, color}: {focused: boolean; size: number, color:string}) => {
            return (
              <TabIcon
                focused={focused}
                color={color}
                size={size}
                type="MaterialIcons"
                name="home"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        children={() => <SearchScreen onDataChange={handleDataChange} />}
        options={{
          tabBarLabel: 'Search',
          headerShown: false,
          tabBarIcon: ({focused, size, color}: {focused: boolean; size: number, color:string}) => {
            return (
              <TabIcon
                focused={focused}
                color={color}
                size={size}
                type="MaterialCommunityIcons"
                name="book-search-outline"
              />
            );
          },
          tabBarBadge: total>0?total:undefined,
        }}
      />
      <Tab.Screen
        name="ChatStack"
        component={ChatStackNavigation}
        options={{
          tabBarLabel: 'Chats',
          headerShown: false,
          tabBarIcon: ({focused, size, color}: {focused: boolean; size: number, color:string}) => {
            return (
              <TabIcon
                focused={focused}
                color={color}
                size={size}
                type="Ionicons"
                name="chatbubbles-outline"
              />
            );
          },
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
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
  },
  focusedStyles: {
    borderTopWidth: 1.5,
    // borderTopColor: tabBarActiveTintColor,
  },
});


const windowWidth = Dimensions.get('window').width;

const tabStyle = StyleSheet.create({
  active: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    // backgroundColor: 'white',
    // backgroundColor: '#6c52fd',
    height: '100%',
    display: 'flex',
    width: windowWidth / 3,
    borderTopRightRadius: -200,
    borderBottomWidth: 7,
    overflow: 'hidden',
  },
});


function TabIcon({focused, name, size, type, color}:{focused: boolean, name: string, size: number, type?:string, color: string}) {
  if (type === 'MaterialCommunityIcons') {
    return (
      <View style={focused ? tabStyle.active : {}}>
        <MaterialCommunityIcons name={name} color={'#fff'} size={size} />
      </View>
    );
  }
  if (type === 'MaterialIcons') {
    return (
      <View style={focused ? tabStyle.active : {}}>
        <MaterialIcons name={name} color={'#fff'} size={size} />
      </View>
    );
  }
  if (type === 'Ionicons') {
    return (
      <View style={focused ? tabStyle.active : {}}>
        <Ionicons name={name} color={'#fff'} size={size} />
      </View>
    );
  }
  return (
    <View style={focused ? tabStyle.active : {}}>
      <Entypo name={name} color={'#fff'} size={size} />
    </View>
  );

}
