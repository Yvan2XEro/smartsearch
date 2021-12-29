import React from 'react'
import { KeyboardTypeOptions, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native';

const SearchInput = ({
  onChangeText,
  keyboardType = 'default',
  label,
  placeholder="",
fieldIcon
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
          backgroundColor: '#fff',
          borderRadius: 10,
          borderBottomWidth: 0.5,
          overflow: 'hidden',
        }}>
        <View style={{justifyContent: 'center', paddingLeft:5}}>{fieldIcon}</View>
        <View style={{width: '100%'}}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            placeholder={placeholder ? placeholder : ''}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchInput

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 0,
  },
});
