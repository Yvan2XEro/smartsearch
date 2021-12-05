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
import * as base from '../api/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Document} from '../models/Document';
import {useNavigation} from '@react-navigation/native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import SearchBlock from '../components/SeachBlock';

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
        base.springer_url + `&q=${query}` + ' &s=' + currentPage + ' &p=' + 10,
      );
      console.log('QUERY: ' + query);
      const response2 = await fetch(base.elsevier_url + `&query=${query}`);
      const json1 = await response1.json();
      const json2 = await response2.json();
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
      const values: any[] = [...data, ...json1.records, ...data2];
      onDataChange(values.length);
      setData(values);
      setCurrentPage(currentPage + 1);
    } catch (error) {
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
  const [query, onChangeQuery] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <SearchBlock
        value={query}
        onChangeInputQuery={onChangeQuery}
        onSubmitInputQuery={() => {
          aggregateSearch(query);
        }}
      />
      {data && (
        <FlatList
          data={data}
          keyExtractor={({title}, index) => title + index}
          renderItem={({item}) => (
            <View style={styles.item}>
              {(item as any).contentType !== 'Article' ? (
                <Icon
                  name="book"
                  size={30}
                  style={{
                    marginRight: 10,
                    marginLeft: 0,
                    color: 'purple',
                  }}
                />
              ) : (
                <MaterialIcons
                  name="article"
                  size={30}
                  style={{
                    marginRight: 10,
                    marginLeft: 0,
                    color: 'lightred',
                  }}
                />
              )}
              <Text
                onPress={() => {
                  year;
                  /* 1. Navigate to the Details route with params, passing the params as an object in the method navigate */
                  navigation.navigate(
                    'SearchStack' as never,
                    {
                      screen: 'Details',
                      params: {
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
                      },
                    } as never,
                  );
                }}
                style={{flex: 1, flexWrap: 'wrap'}}>
                {(item as any).title}, {(item as any).publicationDate}
              </Text>
              <View
                style={{
                  alignSelf: 'flex-start',
                  position: 'absolute',
                  paddingLeft: 15,
                  right: 0,
                }}>
                <Menu>
                  <MenuTrigger>
                    <Icon name="dots-vertical" color="gray" size={20} />
                  </MenuTrigger>

                  <MenuOptions>
                    <MenuOption onSelect={() => {}} text="Cite" />
                    <MenuOption onSelect={() => {}}>
                      <Text style={{color: 'red'}}>Save</Text>
                    </MenuOption>
                    <MenuOption
                      onSelect={() => {}}
                      disabled={true}
                      text="Recommand"
                    />
                  </MenuOptions>
                </Menu>
              </View>
            </View>
          )}
          initialNumToRender={10} // how many item to display first
          onEndReachedThreshold={2} // so when you are at 5 pixel from the bottom react run onEndReached function
          onEndReached={() => {
            aggregateSearch(query);
          }}
        />
      )}
      {isLoading && <ActivityIndicator />}
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
  containerPopup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
  },
});

export default SearchScreen;
