import React from 'react';
import {Button, View} from 'react-native';

const HomeScreen = ({navigation}: {navigation: any}) => {
  return (
    <View>
      <Button
        title="Go to Search page"
        onPress={() => navigation.navigate('Search')}
      />
      <Button
        title="Go to settings page"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};

export default HomeScreen;
