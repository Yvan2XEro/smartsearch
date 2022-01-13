import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAction } from '../store/loggedUser/actions';
import firestore from '@react-native-firebase/firestore'
import { User } from '../types';

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

  const writeUser = async (uid: string, user: User) => {
    return await firestore()
      .doc('users/' + uid)
      .set(user);
  };

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
            return auth().signInWithCredential(googleCredential)
            .then(async({user})=>{
              const u = {
                id: user.uid,
                email: user.email || '',
                displayName: user.displayName || '',
                createdAt: new Date().toISOString(),
              };
              await writeUser(user.uid, u)
            dispatch(updateUserAction(u));
          });
          }
        },
        register: async (payload, type = EMAIL_PASSWORD) => {
          if (type !== GOOGLE) {
            const {email, password, displayName} = payload;
            return await auth().createUserWithEmailAndPassword(email, password).then(async({user})=>{
              if(user) {
                await user.updateProfile({displayName}).then(async()=>{
                  dispatch(updateUserAction({...reduxUser, displayName}));
                })
                await writeUser(user.uid, {
                  id: user.uid,
                  email: user.email || '',
                  displayName,
                  createdAt: new Date().toISOString(),
                });
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
