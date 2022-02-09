import React, { Fragment } from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {MenuProvider} from 'react-native-popup-menu';
import {Provider as PaperProvider} from 'react-native-paper';
import RootNavigation from './src/app/navigations/RootNavigation';
import store from './src/app/store';
import AuthContextProvider from './src/app/contexts/AuthContextProvider';
import { theme } from './src/app/styles';
import { StatusBar } from 'react-native';
import LoginTypeContextProvider from './src/app/contexts/LoginTypeContextProvider';

const App = () => {
  return (
    <Fragment>
      <StatusBar backgroundColor={theme.colors.primary} />
      <MenuProvider>
        <ReduxProvider store={store}>
          <LoginTypeContextProvider>
            <AuthContextProvider>
              <PaperProvider theme={theme}>
                <NavigationContainer>
                  <RootNavigation />
                </NavigationContainer>
              </PaperProvider>
            </AuthContextProvider>
          </LoginTypeContextProvider>
        </ReduxProvider>
      </MenuProvider>
    </Fragment>
  );
};

export default App;
