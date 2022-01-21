import {DrawerItem} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const CustomDrawerItem = ({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: string;
  onPress: any;
}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <DrawerItem
        icon={({}) => icon}
        style={{flex: 0.9}}
        labelStyle={{fontSize: 13}}
        label={label}
        onPress={onPress}
      />
      <SimpleLineIcons
        name="arrow-right"
        size={18}
        style={{alignSelf: 'center'}}
      />
    </View>
  );
};

export default CustomDrawerItem;

const styles = StyleSheet.create({});
