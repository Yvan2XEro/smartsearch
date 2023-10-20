import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from '../styles';

const AppHeader = ({
  navigation,
  title,
  type = 'app',
  showsSearchIcon = true,
}: {
  navigation: any;
  title?: string;
  type?: string;
  showsSearchIcon?: boolean;
}) => {
  return (
    <View style={appHeaderStyles.header}>
      {type !== 'back' ? (
        <Entypo
          onPress={() => navigation.openDrawer()}
          color="white"
          name="menu"
          size={30}
        />
      ) : (
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          color="white"
          size={30}
        />
      )}
      <View style={{flex: 0.9, marginLeft: 16}}>
        <Text
          style={{
            fontSize: 17,
            textTransform: 'uppercase',
            color: 'white',
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
      </View>
      {showsSearchIcon === true && <TouchableOpacity>
          <Ionicons
            onPress={() => navigation.navigate('Search')}
            name="ios-search"
            color="white"
            size={25}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppHeader;
const appHeaderStyles = StyleSheet.create({
  header: {
    paddingLeft: 16,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.colors.primary,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1,
    marginLeft: 15,
  },
  icon: {
    marginLeft: 16,
  },
});
