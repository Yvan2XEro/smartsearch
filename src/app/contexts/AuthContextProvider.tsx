import React, {createContext, useContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {updateUserAction} from '../store/loggedUser/actions';
import firestore from '@react-native-firebase/firestore';
import {User} from '../types';
import {LoginTypeContext, LOGIN_TYPE_KEY} from './LoginTypeContextProvider';
import {localStorage} from '../services';

GoogleSignin.configure({
  webClientId:
    '448522931485-ko24e70d0pmanqah6q4udfbo1qjvg121.apps.googleusercontent.com',
});

const user: any = null;
export const AuthenticationContext = createContext({
  user: user,
  setUser: (value: any) => {},
  login: (credentials: any, type: string) => new Promise(() => {}),
  register: (payload: any, type: string, signin?: () => void) =>
    new Promise(() => {}),
  logout: () => {},
});

export const EMAIL_PASSWORD = 'EMAIL_PASSWORD';
export const GOOGLE = 'GOOGLE';

const AuthContextProvider = ({children}: any) => {
  const [user, setUser] = useState(auth().currentUser);
  const dispatch = useDispatch();

  const writeUser = async (uid: string, user: User) => {
    return await firestore()
      .doc('users/' + uid)
      .set(user);
  };

  const {setLoginType, loginType} = useContext(LoginTypeContext);

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
        login: async (credential, type = EMAIL_PASSWORD) => {
          if (type !== GOOGLE) {
            const {email, password} = credential;
            setLoginType(EMAIL_PASSWORD);
            localStorage.set(LOGIN_TYPE_KEY, EMAIL_PASSWORD);
            return await auth()
              .signInWithEmailAndPassword(email, password)
              .then(() => {
                firestore()
                  .collection('users')
                  .where('email', '==', email)
                  .get()
                  .then(snapshot => {
                    if (snapshot.docs.length > 0) {
                      dispatch(
                        updateUserAction(snapshot.docs[0].data() as User),
                      );
                    }
                  });
              });
          } else {
            setLoginType(GOOGLE);
            localStorage.set(LOGIN_TYPE_KEY, GOOGLE);
            const {idToken} = await GoogleSignin.signIn();
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            return auth()
              .signInWithCredential(googleCredential)
              .then(async ({user}) => {
                const u = {
                  pk: user.uid,
                  email: user.email || '',
                  displayName: user.displayName || '',
                  photoUrl:
                    user.photoURL ||
                    'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527__340.png',
                  createdAt: new Date().toISOString(),
                };
                if (
                  !(
                    await firestore()
                      .doc('users/' + user.uid)
                      .get()
                  ).exists
                ) {
                  await writeUser(user.uid, u);
                }
                dispatch(updateUserAction(u));
              });
          }
        },
        register: async (payload, type = EMAIL_PASSWORD) => {
          if (type !== GOOGLE) {
            const {email, password, displayName} = payload;
            return await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(async ({user}) => {
                if (user) {
                  const u = {
                    pk: user.uid,
                    email: user.email || '',
                    displayName,
                    photoUrl:
                      'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527__340.png',
                    createdAt: new Date().toISOString(),
                  };
                  await user.updateProfile({displayName}).then(async () => {
                    dispatch(updateUserAction(u));
                  });
                  await writeUser(user.uid, u);
                }
              });
          }
        },
        logout: async () => {
          try {
            if (loginType === GOOGLE) {
              await GoogleSignin.signOut();
            }
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
