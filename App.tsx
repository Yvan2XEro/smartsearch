import React from 'react';
import {Provider as ReduxProvider} from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import {Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import RootNavigation from './src/app/navigations/RootNavigation';
import store from './src/app/store';

const App = () => {
  return (
    <MenuProvider>
      <ReduxProvider store={store}>
        <PaperProvider
          theme={{...DefaultTheme, colors: {...DefaultTheme.colors, primary: 'black'}}}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </PaperProvider>
      </ReduxProvider>
    </MenuProvider>
  );
};
export const colors = {
  violet: '#e91e63',
};

export default App;
