import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RadioButton, Text} from 'react-native-paper';
import React, {useState} from 'react';
import {styles} from '../components/DetailsHeader';

const ThemeSettingScreen = ({navigation}: any) => {
  return (
    <View>
      <View style={[styles.header, {paddingRight: 20}]}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          color="white"
          size={30}
        />
        <View style={{marginLeft: 16}}>
          <Text
            style={{
              fontSize: 17,
              textTransform: 'uppercase',
              color: 'white',
              fontWeight: 'bold',
            }}>
            THEME
          </Text>
        </View>
        {/* <TouchableOpacity style={{marginLeft: 'auto'}}>
          <Entypo name="plus" size={30} color={theme.colors.surface} />
        </TouchableOpacity> */}
      </View>
      <View>
        <Text>Choose theme</Text>
        <View>
          <RadioButton value="Classic" />
          <RadioButton value="Default" />
        </View>
      </View>
    </View>
  );
};

export default ThemeSettingScreen;
