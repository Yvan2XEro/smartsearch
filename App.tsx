/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {useCallback, useEffect, useState} from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Searchbar} from 'react-native-paper';
import axios from 'axios';

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

const SearchScreen = ({
  onDataChange,
}: {
  onDataChange: (total: number) => void;
}) => {
  const springer_api_key: string = '9020e0837c3c3dc0836fa0963c857265';
  const springer_url: string =
    'https://api.springernature.com/meta/v2/json?api_key=' + springer_api_key;

  const elsevier_api_key: string = 'dc396ed2b0108f4a9f52abd986db3d82';

  const elsevier_url: string =
    'https://api.elsevier.com/content/search/scopus?httpAccept=application/json&pageSize=10&apiKey' +
    elsevier_api_key;

  const google_api_key =
    '4a598c300793f6199b13cc68d158f6a090e746dbe57146e6adb9fb70759dfc0b';
  const google_scholar_url: string =
    'https://serpapi.com/search?engine=google_scholar&apikey=' + google_api_key;

  const ieee_api = 'kvgbvamz8jvsxzwjm5b6kuvm';
  const ieee_url =
    'http://ieeexploreapi.ieee.org/api/v1/search/articles?format=json&max_records=25&start_record=1&sort_order=asc&sort_field=article_number&apikey=' +
    ieee_api;

  const [data, setData] = useState(Array());
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const [isLoading2, setLoading2] = useState(true);

  const [total, setTotal] = useState(0);

  const aggregateSearch = async (query: string) => {
    setLoading(true);
    try {
      const response1 = await fetch(springer_url + `&q=${query}`);
      const response2 = await fetch(elsevier_url + `&query=${query}`);
      //const response3 = await fetch(ieee_url + `&querytext=${query}`);
      const response4 = await fetch(google_scholar_url + `&q=${query}`);

      const json1 = await response1.json();
      const json2 = await response2.json();
      //const json3 = await response3.json();
      const json4 = await response4.json();
      //setTotal(json1?.result[0]?.total ?? 0);
      //onDataChange(total);
      //setData(json1.records);
      const dat =
        json2['search-results'] && json2['search-results']['entry']
          ? json2['search-results']['entry'].map((item: any) => {
              return {
                title: item['dc:title'],
                publicationDate: item['prism:coverDate'],
              };
            })
          : [];
      setData2(dat);
      const dat1 = json4.organic_results
        ? json4.organic_results.map((item: any) => {
            return {
              title: item.title,
              publicationDate: '',
            };
          })
        : [];
      setData4(dat1);
      const values: any[] = [...json1.records, ...data2, ...data4];
      //setTotal(json1?.result[0]?.total ?? 0);
      //onDataChange(total);
      onDataChange(values.length);
      setData(values);
    } catch (error) {
      //console.log('error ....: ', error);
      Alert.alert(error + '');
    } finally {
      setLoading(false);
    }
  };

  const makeSearch = async (query: string, doi?: string) => {
    setLoading(true);
    try {
      const response = await fetch(springer_url + `&q=${query}`);
      const json = await response.json();
      setTotal(json?.result[0]?.total ?? 0);
      onDataChange(total);
      setData(json.records);
    } catch (error) {
      Alert.alert(error + '');
    } finally {
      setLoading(false);
    }
  };

  const makeSearch2 = async (req: string, doi?: string) => {
    try {
      const response = await fetch(elsevier_url + `&query=${req}`);
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
  const [query, onChangeQuery] = React.useState('year:2015');

  /*useEffect(() => {
    makeSearch(query);
    //aggregateSearch(query);
    //makeSearch2(query);
  }, [query]);
  */
  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Type Here..."
        onChangeText={onChangeQuery}
        onSubmitEditing={() => {
          //makeSearch(query);
          aggregateSearch(query);
        }}
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
      {/* {isLoading2 ? (
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
      )} */}
    </SafeAreaView>
  );
};

function MyTabs() {
  const [total, setTotal] = useState(0);
  const handleDataChange = (total: number) => {
    setTotal(total);
  };
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
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        children={() => <SearchScreen onDataChange={handleDataChange} />}
        options={{
          tabBarLabel: 'Search',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
          tabBarBadge: total,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="settings-display" color={color} size={size} />
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
