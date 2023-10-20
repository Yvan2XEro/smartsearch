import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import AppHeader from '../components/AppHeader';
import SavedDocuments from '../containers/SavedDocuments';

const Stack = createNativeStackNavigator();

const SavedDocsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SavedDocs"
        options={{
          header: ({navigation}) => (
            <AppHeader navigation={navigation} title="Saved docs" />
          ),
        }}
        component={SavedDocuments}
      />
    </Stack.Navigator>
  );
};

export default SavedDocsStack;
