import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import RootNavigation from './src/app/navigations/RootNavigation';

const App = () => {
  return (
    <MenuProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'lightgray',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  item2: {
    backgroundColor: 'lightgray',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 8,
  },
  title: {
    fontSize: 32,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    margin: 12,
  },
  footer: {
    backgroundColor: '#black',
    color: '#white',
    margin: 12,
  },
});

export const colors = {
  violet: '#e91e63',
};

export default App;
