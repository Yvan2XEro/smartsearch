import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AppHeader = ({
  navigation,
  title,
  type = 'app',
}: {
  navigation: any;
  title: string | undefined;
  type?: string;
}) => {
  return (
    <View style={styles.header}>
      {type !== 'back' ? (
        <Entypo onPress={() => navigation.openDrawer()} name="menu" size={30} />
      ) : (
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={30}
        />
      )}
      <View style={{width: '100%', marginLeft: 16}}>
        <Text style={{fontSize: 18}}>{title}</Text>
      </View>
    </View>
  );
};

export default AppHeader;
const styles = StyleSheet.create({
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
    backgroundColor: '#fff',
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
