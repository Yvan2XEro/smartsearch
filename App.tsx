/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {useEffect, useState} from 'react';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  Alert,
  SafeAreaView,
  Button,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}: {navigation: any}) => {
  return (
    <View>
      <Button
        title="Go to Search page"
        onPress={() => navigation.navigate('Search')}
      />
      <Button
        title="Go to settings page"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
};

const SettingsScreen = ({navigation, route}: {navigation: any; route: any}) => {
  return <Text>This is Settings page using search ontology</Text>;
};

const SearchScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const url: string = 'https://api.springernature.com/meta/v2/json';
  const api_key: string = '9020e0837c3c3dc0836fa0963c857265';
  const url_elsevier: string =
    'https://api.elsevier.com/content/search/scopus?httpAccept=application/json&pageSize=10';
  const api_key_elsevier: string = 'dc396ed2b0108f4a9f52abd986db3d82';

  const api_key_ieee: string = 'kvgbvamz8jvsxzwjm5b6kuvm';
  const url_ieee =
    'https://ieeexploreapi.ieee.org/api/v1/search/articles?parameter&apikey=' +
    api_key_ieee;

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoading2] = useState(true);
  const makeSearch = async (year: string, doi?: string) => {
    try {
      const response = await fetch(url + `?q=year:${year}&api_key=${api_key}`);
      const json = await response.json();
      setData(json.records);
    } catch (error) {
      Alert.alert(error + '');
    } finally {
      setLoading(false);
    }
  };
  const [total, setTotal] = useState(0);
  const makeSearch2 = async (req: string, doi?: string) => {
    try {
      const response = await fetch(
        url_elsevier + `&query=${req}&apiKey=${api_key_elsevier}`,
      );
      const json = await response.json();
      setTotal(+json['search-results']['opensearch:totalResults']);
      setData2(json['search-results']['entry']);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading2(false);
    }
  };

  const [year, onChangeYear] = React.useState('2015');
  const [query, onChangeQuery] = React.useState('security');

  useEffect(() => {
    makeSearch(year);
  }, [year]);
  useEffect(() => {
    makeSearch2(query);
  }, [query]);
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeYear}
        underlineColorAndroid="transparent"
        value={year}
      />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={onChangeQuery}
        value={query}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        data && (
          <FlatList
            data={data}
            keyExtractor={({title}, index) => title}
            renderItem={({item}) => (
              <Text style={styles.item}>
                {(item as any).title}, {(item as any).publicationDate}
              </Text>
            )}
          />
        )
      )}
      {isLoading2 ? (
        <ActivityIndicator />
      ) : (
        data2 && (
          <FlatList
            data={data2}
            renderItem={({item}) => (
              <Text style={styles.item2}>
                {item['dc:title']} {item['dc:creator']}
                {item['prism:coverDate']}
              </Text>
            )}
            keyExtractor={(item: any, index) => item['dc:title'] + index}
            ListFooterComponent={<Text>{'TOTAL SEARCH: ' + total}</Text>}
            ListEmptyComponent={<Text>OOps!!!!</Text>}
            ListFooterComponentStyle={styles.footer}
          />
        )
      )}
    </SafeAreaView>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="card-search"
              color={color}
              size={size}
            />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="setting" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'lightgray',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  item2: {
    backgroundColor: 'lightgray',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 8,
  },
  title: {
    fontSize: 32,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    margin: 12,
  },
  footer: {
    backgroundColor: '#black',
    color: '#white',
    margin: 12,
  },
});

export default App;
