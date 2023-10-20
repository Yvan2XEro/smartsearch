import React from 'react';
import {StyleSheet, View} from 'react-native';
import Knowledge from '../assets/knowledge.svg';
import {Button, Text} from 'react-native-paper';
import {theme} from '../styles';

const StartScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1.7}}>
        <Knowledge width="100%" height="100%" />
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.title}>Welcome to Smart Search app!</Text>
          <Text style={{letterSpacing: 0.5}}>You can find any docs here.</Text>
        </View>
        <View style={{marginTop: 15}}>
          <Button
            onPress={() => navigation.navigate('SignIn')}
            style={{backgroundColor: theme.colors.primary, borderRadius: 20}}
            labelStyle={{color: '#fff'}}>
            Login
          </Button>
          <Button
            onPress={() => navigation.navigate('SignOut')}
            style={{
              borderWidth: 1,
              borderColor: theme.colors.primary,
              borderRadius: 20,
              marginTop: 10,
            }}>
            Register
          </Button>
        </View>
      </View>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: theme.colors.primary},
  footer: {
    backgroundColor: '#fff',
    flex: 1.3,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 20,
    overflow: 'hidden',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: theme.colors.primary,
  },
});
