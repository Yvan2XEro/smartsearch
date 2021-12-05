import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import * as React from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import SearchScreen from '../containers/SearchScreen';
import { AppTabNavigation } from './AppTabNavigation';


const Drawer = createDrawerNavigator();
export default function RootNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="App"
      drawerType="front"
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 10 },
      }}
      navigationOptions={({ navigation }: { navigation: any }) => ({
        
       
      })}
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
      <Drawer.Screen name="App" component={AppTabNavigation} />
      <Drawer.Screen name="Search" component={SearchScreen} />
    </Drawer.Navigator>
  );
}