import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import DrawerContent from '../components/DrawerContent';
import { loadDocsAction } from '../store/docs/actions';
import { loadResultsAction } from '../store/queriesResults/actions';
import { AppTabNavigation } from './AppTabNavigation';
import SavedDocsStack from './SavedDocsStack';
import SearchStackNavigation from './SearchStackNavigation';
import {AuthenticationContext} from '../contexts/AuthContextProvider';
import auth from '@react-native-firebase/auth';
import AuthStackNavigation from './AuthStackNavigation';
import SharedScreen from '../containers/SharedScreen';
import { updateUserAction } from '../store/loggedUser/actions';
import firestore from '@react-native-firebase/firestore'
import { User } from '../types';

const Drawer = createDrawerNavigator();
export default function RootNavigation() {
  // Initialiser les states redux
  const dispatch = useDispatch();
  const {setUser, user} = React.useContext(AuthenticationContext);
  React.useEffect(() => {
    dispatch(loadDocsAction());
    dispatch(loadResultsAction());
    if (user)
    firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(snapshot => {
        dispatch(updateUserAction(snapshot.data() as User));
      });
  }, []);

  console.log(user)
  const [initializing, setInitializing] = React.useState(true);

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (user)
      // dispatch(updateUserAction(user));
    if (initializing) setInitializing(false);
  }
  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  if (user)
  return (
    <Drawer.Navigator
      initialRouteName="App"
      drawerType="front"
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 10},
      }}
      drawerContent={(props: any) => {
        return <DrawerContent {...props} />;
      }}>
      <Drawer.Screen
        name="App"
        options={{title: 'Home'}}
        component={AppTabNavigation}
      />
      <Drawer.Screen
        name="SavedDocsStack"
        options={{title: 'Saved docs'}}
        component={SavedDocsStack}
      />
      <Drawer.Screen
        name="SearchStack"
        options={{title: 'Search'}}
        component={SearchStackNavigation}
      />
      <Drawer.Screen
        name="SharedScreen"
        options={{
          title: 'SHARED', headerShown: true}}
        component={SharedScreen}
      />
    </Drawer.Navigator>
  );
  else 
  return <AuthStackNavigation/>;
}
