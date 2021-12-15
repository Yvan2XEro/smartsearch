import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import {Provider as PaperProvider } from 'react-native-paper'
import RootNavigation from './src/app/navigations/RootNavigation';

const App = () => {
  return (
    <MenuProvider>
      <PaperProvider>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </PaperProvider>
    </MenuProvider>
  );
};
export const colors = {
  violet: '#e91e63',
};

export default App;
