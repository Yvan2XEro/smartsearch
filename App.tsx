/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import axios from 'axios';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const url: string = 'https://api.springernature.com/meta/v2/json';
  const api_key: string = '9020e0837c3c3dc0836fa0963c857265';
  const url_springer: string = 'https://api.springernature.com/meta/v2/json';
  const api_key_springer: string = '9020e0837c3c3dc0836fa0963c857265';
  const url_elsevier: string =
    'https://api.elsevier.com/content/search/scopus?httpAccept=application/json';
  const api_key_elsevier: string = 'dc396ed2b0108f4a9f52abd986db3d82';

  const api_key_ieee: string = 'kvgbvamz8jvsxzwjm5b6kuvm';
  const url_ieee =
    'https://ieeexploreapi.ieee.org/api/v1/search/articles?parameter&apikey=' +
    api_key_ieee;

  const [data, setData] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const makeSearch = async (year: string, doi?: string) => {
    try {
      const response = await fetch(url + `?api_key=${api_key}`);
      const json = await response.json();
      console.log('record.....', json);
      setData(json.records);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [text, onChangeText] = React.useState('2015');
  useEffect(() => {
    makeSearch(text);
  }, [text]);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Text style={{fontSize: 20}}>Welcome to smart search</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <View style={{flex: 1, padding: 24}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({title}, index) => title}
            renderItem={({item}) => (
              <Text>
                {(item as any).title}, {(item as any).publicationDate}
              </Text>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
