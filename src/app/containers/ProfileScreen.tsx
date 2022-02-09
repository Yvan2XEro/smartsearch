import {Dimensions, View, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { styles } from '../components/DetailsHeader';
import { theme } from '../styles';
import {Avatar, Button, Switch, Text} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loggedUserSelector } from '../store/loggedUser/selectors';
import { User } from '../types';
import { LoginTypeContext } from '../contexts/LoginTypeContextProvider';
import { GOOGLE } from '../contexts/AuthContextProvider';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import { updateUserAction } from '../store/loggedUser/actions';


const ProfileScreen = ({navigation}:any) => {
    const [user, setUser] = useState(
      useSelector(loggedUserSelector) as User ,
    );
    const {loginType} = useContext(LoginTypeContext)
    console.log(loginType)
    const [updateGoogle, setUpdateGoogle] = useState(true)
    const [loading1, setloading1] = useState(false);
    const [loading2, setloading2] = useState(false);
    const [loading3, setloading3] = useState(false);
    const [error, setError] = useState("")
    const usersQuery = firestore().collection('users')
    const dispatch = useDispatch()
    const onSubmitUpdateProfile = useCallback(()=>{
        setloading2(true)
        try {
            usersQuery
              .doc(user?.pk)
              .update(user)
              .then(() => {
                dispatch(updateUserAction(user));
              });
        } catch (err) {
            
        }finally {
            setloading2(false)
        }
    },[user])
  return (
    <View style={{flex: 1}}>
      <View style={[styles.header, {paddingRight: 20, elevation: 0}]}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          color="white"
          size={30}
        />
        <View style={{marginLeft: 16, width: '100%'}}>
          <Text
            style={{
              fontSize: 17,
              textTransform: 'uppercase',
              color: 'white',
              fontWeight: 'bold',
            }}>
            PROFILE
          </Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 30,
            height: Dimensions.get('window').height / 4.6,
          }}>
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              backgroundColor: theme.colors.surface,
              width: '100%',
              marginTop: 60,
              borderRadius: 10,
              padding: 10,
              paddingTop: 50,
            }}>
            <Avatar.Image
              source={{uri: user?.photoUrl}}
              size={80}
              style={{position: 'absolute', alignSelf: 'center', top: -40}}
            />
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    letterSpacing: 0.5,
                  }}>
                  Full Name:{' '}
                </Text>
                <Text>{user?.displayName}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    letterSpacing: 0.5,
                  }}>
                  Email:{' '}
                </Text>
                <Text>{user?.email}</Text>
              </View>
            </View>
          </View>
        </View>
        <KeyboardAvoidingView
          style={{paddingTop: 100, paddingHorizontal: 30, marginBottom: 50}}
          behavior={undefined}
          keyboardVerticalOffset={0}>
          <Text style={{fontSize: 18, marginBottom: 5}}>
            Update your profile
          </Text>
          {error.length > 0 && (
            <Text style={{color: theme.colors.error}}>{error}</Text>
          )}
          <CustomTextInput
            onChangeText={text => setUser({...user, email: text})}
            label="Email"
            value={!!user ? user?.email : ''}
            icon={
              <MaterialIcons
                name="vpn-key"
                size={25}
                color={theme.colors.primary}
              />
            }
          />
          <CustomTextInput
            onChangeText={text => setUser({...user, displayName: text})}
            value={user.displayName}
            label="Full name"
            icon={<Entypo name="user" size={25} color={theme.colors.primary} />}
          />
          {loginType === GOOGLE && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>Use in my google account</Text>
              <Switch
                value={updateGoogle}
                onValueChange={() => setUpdateGoogle(prev => !prev)}
              />
            </View>
          )}
          <Button
            mode="outlined"
            onPress={onSubmitUpdateProfile}
            loading={loading2}
            icon={() => (
              <Entypo name="check" size={30} color={theme.colors.primary} />
            )}>
            Apply
          </Button>
          {loginType !== GOOGLE && (
            <>
              <Text style={{fontSize: 18, marginBottom: 5, marginTop: 10}}>
                Change password
              </Text>
              <CustomTextInput
                onChangeText={text => {}}
                value={''}
                label="Old password"
                icon={
                  <MaterialIcons
                    name="vpn-key"
                    size={25}
                    color={theme.colors.primary}
                  />
                }
              />
              <CustomTextInput
                onChangeText={text => {}}
                value={''}
                label="New password"
                icon={
                  <MaterialIcons
                    name="vpn-key"
                    size={25}
                    color={theme.colors.primary}
                  />
                }
              />

              <Button
                mode="outlined"
                icon={() => (
                  <Entypo name="check" size={30} color={theme.colors.primary} />
                )}>
                Apply
              </Button>
            </>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const CustomTextInput = ({onChangeText, icon, label,value}: {onChangeText: (text: string)=>void, icon: any, label:string,value: string})=>{
    return (
      <View
        style={{
          borderWidth: 0.3,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8,
          backgroundColor: theme.colors.surface,
          paddingLeft: 5,
          borderColor: theme.colors.primary,
        }}>
        {icon}
        <TextInput
          value={value}
          placeholder={label}
          onChangeText={onChangeText}
          style={{width: '100%'}}
        />
      </View>
    );
}