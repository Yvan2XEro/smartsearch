import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import * as base from '../api/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import {Document} from '../models/Document';
import {useNavigation} from '@react-navigation/native';

const SearchScreen = ({
  onDataChange,
}: {
  onDataChange: (total: number) => void;
}) => {
  const navigation = useNavigation();

  const [data, setData] = useState(Array());
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setLoading] = useState(false);
  const [isLoading2, setLoading2] = useState(true);

  const [total, setTotal] = useState(0);

  const aggregateSearch = async (query: string) => {
    setLoading(true);
    try {
      const response1 = await fetch(
        base.springer_url + `&q=${query}` + ' &s=' + currentPage + ' &p=' + 100,
      );
      const response2 = await fetch(base.elsevier_url + `&query=${query}`);
      //const response3 = await fetch(base.ieee_url + `&querytext=${query}`);
      // const response4 = await fetch(base.google_scholar_url + `&q=${query}`);

      const json1 = await response1.json();
      const json2 = await response2.json();
      // const json3 = await response3.json();
      // const json4 = await response4.json();
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
      /*
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
      */
      //console.log('data....: ', json1.records);
      //setData(json1.records);
      //onDataChange(json1.records.length);
      const values: any[] = [...data, ...json1.records, ...data2];
      //setTotal(json1?.result[0]?.total ?? 0);
      //onDataChange(total);
      onDataChange(values.length);
      setData(values);
      setCurrentPage(currentPage + 1);
    } catch (error) {
      //console.log('data....: ', data);
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
            keyExtractor={({title}, index) => title + index}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Text>
                  {(item as any).title}, {(item as any).publicationDate}
                </Text>
                <MaterialIcons
                  name="read-more"
                  color="black"
                  size={20}
                  style={{
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    top: '50%',
                    marginLeft: 5,
                    right: 0,
                  }}
                  onPress={() => {
                    /* 1. Navigate to the Details route with params, passing the params as an object in the method navigate */
                    navigation.navigate(
                      'Details' as never,
                      {
                        document: {
                          title: (item as any).title,
                          publicationDate: (item as any).publicationDate,
                          contentType: (item as any).contentType,
                          publisher: (item as any).publisher,
                          abstract: (item as any).abstract,
                          doi: (item as any).doi,
                          openaccess: (item as any).openaccess,
                          authors: (item as any).creators,
                        } as Document,
                      } as never,
                    );
                  }}
                />
              </View>
            )}
            initialNumToRender={10} // how many item to display first
            onEndReachedThreshold={5} // so when you are at 5 pixel from the bottom react run onEndReached function
            onEndReached={() => {
              aggregateSearch(query);
            }}
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
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    padding: 12,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: 'white',
    margin: 5,
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
