import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {MenuProvider} from 'react-native-popup-menu';
import {Provider as PaperProvider} from 'react-native-paper';
import RootNavigation from './src/app/navigations/RootNavigation';
import store from './src/app/store';
import AuthContextProvider from './src/app/contexts/AuthContextProvider';
import { theme } from './src/app/styles';

const App = () => {
  return (
    <MenuProvider>
      <ReduxProvider store={store}>
        <AuthContextProvider>
          <PaperProvider
            theme={theme}>
            <NavigationContainer>
              <RootNavigation />
            </NavigationContainer>
          </PaperProvider>
        </AuthContextProvider>
      </ReduxProvider>
    </MenuProvider>
  );
};
export const colors = {
  violet: '#e91e63',
};

export default App;
