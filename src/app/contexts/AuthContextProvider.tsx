import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAction } from '../store/loggedUser/actions';
GoogleSignin.configure({
  webClientId:
    '448522931485-ko24e70d0pmanqah6q4udfbo1qjvg121.apps.googleusercontent.com',
});

const user:any = null;
export const AuthenticationContext = createContext({
  user: user,
  setUser: (value: any) => {},
  login: (credentials: any, type: string) => new Promise(()=>{}),
  register: (payload: any, type: string, signin?:()=>void) => new Promise(()=>{}),
  logout: () => {},
});

export const EMAIL_PASSWORD = 'EMAIL_PASSWORD';
export const GOOGLE = 'GOOGLE';

const AuthContextProvider = ({children}:any) => {
  const [user, setUser] = useState(auth().currentUser);
  const [method, setMethod] = useState<string|null>(null);
  const dispatch = useDispatch()
  const reduxUser = useSelector(({loggedUser}: any) => loggedUser);
  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
        login: async (credential, type = EMAIL_PASSWORD) => {
          if (type !== GOOGLE) {
            const {email, password} = credential;
            setMethod(EMAIL_PASSWORD);
            return await auth().signInWithEmailAndPassword(email, password);
          } else {
            setMethod(GOOGLE);
            const {idToken} = await GoogleSignin.signIn();
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            return await auth().signInWithCredential(googleCredential);
          }
        },
        register: async (payload, type = EMAIL_PASSWORD) => {
          if (type !== GOOGLE) {
            const {email, password, displayName} = payload;
            return await auth().createUserWithEmailAndPassword(email, password).then(async(userCredential)=>{
              if(userCredential.user) {
                await userCredential.user.updateProfile({displayName}).then(async()=>{
                  dispatch(updateUserAction({...reduxUser, displayName}));
                })
              }
            });
          }
        },
        logout: async () => {
          try {
            if (method === GOOGLE) await GoogleSignin.signOut();
            await auth().signOut();
          } catch (error) {
            console.log(error);
          } finally {
            setUser(null);
          }
        },
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContextProvider;
