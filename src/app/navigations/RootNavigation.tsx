import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import DrawerContent from '../components/DrawerContent';
import { loadDocsAction } from '../store/docs/actions';
import {AppTabNavigation} from './AppTabNavigation';
import SavedDocsStack from './SavedDocsStack';
import SearchStackNavigation from './SearchStackNavigation';

const Drawer = createDrawerNavigator();
export default function RootNavigation() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadDocsAction());
  }, []);
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
    </Drawer.Navigator>
  );
}
