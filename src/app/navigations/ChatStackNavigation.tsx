import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text } from 'react-native'
import AppHeader from '../components/AppHeader'
import ChatsListScreen from '../containers/ChatsListScreen'

const Stack = createNativeStackNavigator()

const ChatStackNavigation = () => {
    return (
      <Stack.Navigator
        initialRouteName="ChatsList"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="ChatsList"
          component={ChatsListScreen}
          options={{
            title: 'Chats'
          }}
        />
      </Stack.Navigator>
    );
}

export default ChatStackNavigation
