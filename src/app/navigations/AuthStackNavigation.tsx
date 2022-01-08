import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text } from 'react-native'
import SignInScreen from '../containers/SignInScreen'
import SignOutScreen from '../containers/SignOutScreen'
import StartScreen from '../containers/StartScreen'

const Stack = createNativeStackNavigator()
const AuthStackNavigation = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="SignOut" component={SignOutScreen} />
      </Stack.Navigator>
    );
}

export default AuthStackNavigation
