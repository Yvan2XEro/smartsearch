import * as React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ProfileSvg from '../assets/profile.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  AuthenticationContext,
  EMAIL_PASSWORD,
} from '../contexts/AuthContextProvider';
import {emailRegex} from '../services';
import {Button} from 'react-native-paper';

const SignOutScreen = ({navigation}: any) => {
  const [isSecureEntry, setIsSecureEntry] = React.useState(true);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const {login, register} = React.useContext(AuthenticationContext);
  const handleSignUp = () => {
    if (name.trim().length < 3) {
      setError('The name is too short!');
    } else if (!emailRegex.test(email)) {
      setError('Invalid email adress!');
    } else if (password.length < 6) {
      setError('Password too short (min 6 characters)');
    } else {
      setError('');
      setLoading(true);
      register({email, password, displayName: name}, EMAIL_PASSWORD, () =>
        login({email, password}, EMAIL_PASSWORD),
      )
        .catch(error => {
          console.log(error.message);
          if (error.code === 'auth/email-already-in-use') {
            setError('That email address is already in use!');
          }
        })
        .then(() => setLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={undefined}
      keyboardVerticalOffset={100}
      style={styles.container}>
      <View style={{...styles.header}}>
        <ProfileSvg width="100%" height="100%" />
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.title}>REGISTER</Text>
        </View>
        <View style={{marginTop: 15}}>
          <AuthInput
            icon={<Entypo name="user" size={30} />}
            value={name}
            label="Full name"
            onChangeText={(text: string) => setName(text)}
          />
          <AuthInput
            icon={<MaterialIcons name="vpn-key" size={30} />}
            label="Email"
            onChangeText={(text: string) => setEmail(text)}
          />
          <AuthInput
            icon={<MaterialIcons name="lock-outline" size={30} />}
            label="Password"
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
            {error != '' && (
              <Text style={{color: 'red', marginTop: 10}}>{error}</Text>
            )}
            <Button
              onPress={handleSignUp}
              loading={loading}
              style={{backgroundColor: 'gray', borderRadius: 20}}>
              <Text style={{color: '#fff', textAlign: 'center'}}>Register</Text>
            </Button>
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
          <Text style={{textAlign: 'center', fontSize: 12}}>
            Already have google or other account?{' '}
            <Text style={{color: '#000'}}>Sign in</Text>
          </Text>
          <MaterialIcons name="navigate-next" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export const AuthInput = ({
  label,
  value,
  icon,
  rigthIcon,
  onChangeText,
  secureTextEntry = false,
}: {
  label: string;
  value?: string;
  icon: any;
  rigthIcon?: any;
  onChangeText: any;
  secureTextEntry?: boolean;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        borderWidth: 0.3,
        borderColor: 'gray',
        borderRadius: 20,
        paddingLeft: 10,
      }}>
      {icon}
      <TextInput
        placeholder={label + '...'}
        style={{flex: 0.95}}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {rigthIcon}
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
