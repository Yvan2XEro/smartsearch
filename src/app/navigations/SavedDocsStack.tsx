import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { View, Text } from 'react-native'
import SavedDocuments from '../containers/SavedDocuments'

const Stack = createNativeStackNavigator()

const SavedDocsStack = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name='SavedDocs' component={SavedDocuments}  />
        </Stack.Navigator>
    )
}

export default SavedDocsStack
