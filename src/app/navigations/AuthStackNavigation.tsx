import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import SignInScreen from '../containers/SignInScreen';
import SignOutScreen from '../containers/SignOutScreen';
import StartScreen from '../containers/StartScreen';

const Stack = createNativeStackNavigator();
const AuthStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="SignOut" component={SignOutScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;
