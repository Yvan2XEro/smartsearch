import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LoginSvg from '../assets/login.svg';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { AuthInput } from './SignOutScreen';
import { AuthenticationContext, EMAIL_PASSWORD, GOOGLE } from '../contexts/AuthContextProvider';
import { Button } from 'react-native-paper';

const SignInScreen = ({navigation}: any) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [googleLoading, setGoogleLoading] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const {login} = React.useContext(AuthenticationContext);
    const handleSimpleLogin = () => {
      setError('');
      setLoading(true);
      login({email, password}, EMAIL_PASSWORD)
        .catch(error => {
          if (
            error.code == 'auth/user-not-found' ||
            error.code == 'auth/wrong-password' ||
            error.code == 'auth/invalid-email'
          ) {
            setPassword('');
            setError('Bad credentials!');
          }
          console.log("yoo",error)
        })
        .then(() => {
          setLoading(false);
          setGoogleLoading(false);
        });
    };


  const [isSecureEntry, setIsSecureEntry] = React.useState(true);
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
          <AuthInput
            icon={<Entypo name="user" size={30} />}
            value={email}
            label="Email"
            onChangeText={(text: string) => setEmail(text)}
          />
          <AuthInput
            icon={<MaterialIcons name="lock-outline" size={30} />}
            label="Password"
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            rigthIcon={
              <TouchableOpacity
                onPress={() => setIsSecureEntry(!isSecureEntry)}>
                {isSecureEntry ? (
                  <Entypo name="eye" size={30} />
                ) : (
                  <Entypo name="eye-with-line" size={30} />
                )}
              </TouchableOpacity>
            }
            secureTextEntry={isSecureEntry}
          />
          <View style={{marginTop: 10}}>
            {error != '' && <Text style={{color: 'red'}}>{error}</Text>}
            <Button
              onPress={handleSimpleLogin}
              loading={loading}
              style={{backgroundColor: 'gray', borderRadius: 20}}>
              <Text style={{color: '#fff', textAlign: 'center'}}>Login</Text>
            </Button>
            <Button
              onPress={() => {
                setGoogleLoading(true);
                login({}, GOOGLE)
                  .catch((err) => {
                    console.log(err)
                    setGoogleLoading(false)
                  });
              }}
              loading={googleLoading}
              icon={({size}) => (
                <SimpleLineIcons name="social-google" color="red" size={size} />
              )}
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 20,
                marginTop: 10,
              }}>
              With google account
            </Button>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.replace('SignOut')}
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
