import React from 'react';
import {Image, KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import LoginSvg from '../assets/login.svg';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SignInScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LoginSvg width="100%" height="100%" />
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.title}>LOGIN</Text>
        </View>
        <View style={{marginTop: 15}}>
          <AuthInput icon="vpn-key" label="Email" onChangeText={() => {}} />
          <AuthInput
            icon="lock-outline"
            label="Password"
            onChangeText={() => {}}
            secureTextEntry={true}
          />
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')}
              style={{backgroundColor: 'gray', borderRadius: 20}}>
              <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignOut')}
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 20,
                marginTop: 10,
                flexDirection: 'row',
                paddingVertical: 4,
                justifyContent: 'center'
              }}>
                  <SimpleLineIcons name="social-google" size={25} />
              <Text style={{textAlign: 'center'}}>With google  account</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={()=>navigation.replace("SignOut")}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            alignSelf: 'flex-end',
          }}>
          <Text>Register</Text>
          <MaterialIcons name="navigate-next" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const AuthInput = ({
  label,
  value,
  icon,
  onChangeText,
  secureTextEntry=false,
}: {
  label: string;
  value?: string;
  icon: string;
  onChangeText: any;
  secureTextEntry?: boolean;
}) => {
  return (
    <View>
      <Text style={{fontSize: 16}}>{label} :</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 0.3,
          borderColor: 'gray',
          borderRadius: 20,
          paddingLeft: 10,
        }}>
        <MaterialIcons name={icon} size={30} />
        <TextInput
          placeholder={label + '...'}
          style={{width: '100%'}}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'gray'},
  header: {flex: 0.3},
  footer: {
    backgroundColor: '#fff',
    flex: .7,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 20,
    overflow: 'hidden',
  },
  title: {fontWeight: 'bold', fontSize: 25},
});
