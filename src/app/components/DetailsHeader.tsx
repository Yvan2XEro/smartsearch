import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const DetailsHeader = ({
  navigation,
  title,
  onSelectFilterList,
}: {
  navigation: any;
  title: string | undefined;
  onSelectFilterList: any;
}) => {
  return (
    <View style={styles.header}>
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back"
        size={30}
      />
      <View style={{marginLeft: 16}}>
        <Text style={{fontSize: 17, textTransform: 'uppercase'}}>{title}</Text>
      </View>
      <Menu style={{alignSelf: 'center', marginLeft: 'auto'}}>
        <MenuTrigger>
          <Entypo name="dots-three-vertical" color="gray" size={25} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={onSelectFilterList} text="Filters" />
          <MenuOption text="Saved documents" />
          <MenuOption text="Details settings" />
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default DetailsHeader;

const styles = StyleSheet.create({
  header: {
    paddingLeft: 16,
    paddingRight: 5,
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
