import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import AppHeader from '../components/AppHeader';

const SharedScreen = ({navigation, route}: any) => {
  return (
    <View>
      <Tabs
        style={{backgroundColor: '#fff'}}
        dark={false}
        mode="fixed"
        showLeadingSpace={true}>
        <TabScreen label="Sent">
          <Text>Envoyes</Text>
        </TabScreen>
        <TabScreen label="Received">
          <Text>Recus</Text>
        </TabScreen>
      </Tabs>
    </View>
  );
};

export default SharedScreen;

const styles = StyleSheet.create({});
