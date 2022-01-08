import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LoginSvg from '../assets/login.svg';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const SignOutScreen = ({navigation}: any) => {
  return (
    <KeyboardAvoidingView
      behavior={undefined}
      keyboardVerticalOffset={100}
      style={styles.container}>
      <View style={{...styles.header}}>
        <LoginSvg width="100%" height="100%" />
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.title}>REGISTER</Text>
        </View>
        <View style={{marginTop: 15}}>
          <AuthInput
            icon={<MaterialIcons name="vpn-key" size={30} />}
            label="Email"
            onChangeText={() => {}}
          />
          <AuthInput
            icon={<Entypo name="user" size={30} />}
            label="Full name"
            onChangeText={() => {}}
          />
          <AuthInput
            icon={<MaterialIcons name="lock-outline" size={30} />}
            label="Password"
            onChangeText={() => {}}
            secureTextEntry={true}
          />
          <View style={{marginTop: 10}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')}
              style={{backgroundColor: 'gray', borderRadius: 20}}>
              <Text style={{color: '#fff', fontSize: 25, textAlign: 'center'}}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.replace('SignIn')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            alignSelf: 'flex-end',
          }}>
          <Text>Sign in</Text>
          <MaterialIcons name="navigate-next" size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export const AuthInput = ({
  label,
  value,
  icon,
  onChangeText,
  secureTextEntry = false,
}: {
  label: string;
  value?: string;
  icon: any;
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
        {icon}
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

export default SignOutScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'gray'},
  header: {flex: 0.3},
  footer: {
    backgroundColor: '#fff',
    flex: 0.7,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: 20,
    overflow: 'hidden',
  },
  title: {fontWeight: 'bold', fontSize: 25},
});
