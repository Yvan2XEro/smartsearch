import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import * as React from 'react';
import {AppTabNavigation} from './AppTabNavigation';
import SearchStackNavigation from './SearchStackNavigation';

const Drawer = createDrawerNavigator();
export default function RootNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="App"
      drawerType="front"
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 10},
      }}
      drawerContent={(props: any) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Filter"
              onPress={() => props.navigation.navigate('Home')}
            />
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen
        name="App"
        options={{title: 'Home'}}
        component={AppTabNavigation}
      />
      <Drawer.Screen
        name="SearchStack"
        options={{title: 'Search'}}
        component={SearchStackNavigation}
      />
    </Drawer.Navigator>
  );
}
