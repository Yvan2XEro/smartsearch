import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import * as base from '../api/constants';

const SearchScreen = ({
  onDataChange,
}: {
  onDataChange: (total: number) => void;
}) => {
  //https://dev.springernature.com/adding-constraints to see constraints

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
      const response1 = await fetch(base.springer_url + `&q=${query}`);
      const response2 = await fetch(base.elsevier_url + `&query=${query}`);
      const response3 = await fetch(base.ieee_url + `&querytext=${query}`);
      const response4 = await fetch(base.google_scholar_url + `&q=${query}`);

      const json1 = await response1.json();
      const json2 = await response2.json();
      const json3 = await response3.json();
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

      const dat3 =
        json3.articles && json2.articles
          ? json3.articles.map((item: any) => {
              return {
                title: item.publication_title,
                publicationDate: item.publication_date,
              };
            })
          : [];

      const dat1 = json4.organic_results
        ? json4.organic_results.map((item: any) => {
            return {
              title: item.title,
              publicationDate: '',
            };
          })
        : [];
      setData4(dat1);
      const values: any[] = [...json1.records, ...dat3, ...data2, ...data4];
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
      const response = await fetch(base.springer_url + `&q=${query}`);
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
      const response = await fetch(base.elsevier_url + `&query=${req}`);
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

export default SearchScreen;
