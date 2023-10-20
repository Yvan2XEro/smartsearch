import React from 'react';
import {KeyboardTypeOptions, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {TextInput} from 'react-native';
import {theme} from '../../styles';

const SearchInput = ({
  onChangeText,
  keyboardType = 'default',
  label,
  placeholder = '',
  fieldIcon,
}: {
  onChangeText: any;
  keyboardType?: KeyboardTypeOptions;
  label: string;
  placeholder?: string;
  fieldIcon: any;
}) => {
  return (
    <View style={styles.inputWrapper}>
      <Text style={{fontSize: 13}}>{label}:</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          borderColor: 'gray',
          borderRadius: 10,
          borderWidth: 0.5,
          overflow: 'hidden',
        }}>
        <View style={{justifyContent: 'center', paddingLeft: 5}}>
          {fieldIcon}
        </View>
        <View style={{width: '100%'}}>
          <TextInput
            style={{color: theme.colors.text}}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            placeholder={placeholder ? placeholder : ''}
          />
        </View>
        {/* <View style={{width:'94%', height:0.07, alignSelf: 'center', backgroundColor: '#000'}}/> */}
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'column',
    marginBottom: 10,
  },
});
