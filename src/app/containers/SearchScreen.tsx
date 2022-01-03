import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import * as base from '../api/constants';
import {Document} from '../models/Document';
import {useNavigation} from '@react-navigation/native';
import SearchBlock from '../components/SeachBlock';
import DocItem from '../components/DocItem';
import {localStorage, pushSearchResultsIfNotExists} from '../services';
import moment from 'moment';
import { Snackbar } from 'react-native-paper';
import { DOCS_KEY } from './SavedDocuments';
import { useDispatch } from 'react-redux';
import { saveDocAction } from '../store/docs/actions';

const SearchScreen = ({
  onDataChange,
}: {
  onDataChange: (total: number) => void;
}) => {
  const navigation = useNavigation();

  const [data, setData] = useState(Array());
  const [data2, setData2] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [showSaveQueryButton, setShowSaveQueryButton] = useState(false);
  const [buildedQuery, setbuildedQuery] = useState('');
  const [reloadLocalStorage, setReloadLocalStorage] = useState(0);

  // Pour la popup de notification!
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const onSaveQuery = async () => {
    try {
      let queries = await localStorage.get('queries');
      let queriesTab: any[] = [];
      if (queries !== null) {
        queriesTab = [...JSON.parse(queries)];
      }
      pushSearchResultsIfNotExists(queriesTab, {
        query: buildedQuery,
        name:
          'Search_' +
          moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
        createdAt: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
        data,
      });
      await localStorage.set('queries', JSON.stringify(queriesTab));
      setSnackbarMessage("Saved!")
      setShowSnackbar(true)
    } catch (error) {
      console.log(error);
    } finally {
      setReloadLocalStorage(reloadLocalStorage + 1);
    }
  };

  React.useEffect(() => {
    setShowSaveQueryButton(data.length > 0);
  }, [data]);

  // When want to save doc in localstorage
  const dispatch = useDispatch()
  const onSaveDoc = async(doc:any) =>{
    // const docsStr = await localStorage.get('docs');
    // let docs = [];
    // if (docsStr != '') {
    //   docs = JSON.parse(docsStr);
    // }
    // pushSearchResultsIfNotExists(docs, {
    //   data: doc,
    //   createdAt: moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss'),
    // });

    // await localStorage.set(DOCS_KEY, JSON.stringify(docs));
    await dispatch(saveDocAction(doc))
    setSnackbarMessage("Doc saved!")
    setShowSnackbar(true)
  }

  const aggregateSearch = async (query: string) => {
    setbuildedQuery(query);
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

  // const makeSearch = async (query: string, doi?: string) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(base.springer_url + `&q=${query}`);
  //     const json = await response.json();
  //     setTotal(json?.result[0]?.total ?? 0);
  //     onDataChange(total);
  //     setData(json.records);
  //   } catch (error) {
  //     Alert.alert(error + '');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const makeSearch2 = async (req: string, doi?: string) => {
  //   try {
  //     const response = await fetch(base.elsevier_url + `&query=${req}`);
  //     const json = await response.json();
  //     setTotal(+json['search-results']['opensearch:totalResults']);
  //     setData2(json['search-results']['entry']);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading2(false);
  //   }
  // };

  const [year, onChangeYear] = React.useState('2015');
  const [query, setQuery] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <SearchBlock
        value={query}
        onSelectItem={setData}
        onChangeInputQuery={setQuery}
        onSubmitInputQuery={() => {
          setData([]);
          setData2([]);
          aggregateSearch(query);
        }}
        showSaveQueryButton={showSaveQueryButton}
        onSaveQuery={onSaveQuery}
        reloadLocalStorage={reloadLocalStorage}
      />
      {data && (
        <FlatList
          data={data}
          keyExtractor={({title}, index) => title + index}
          renderItem={({item}) => (
            <DocItem
              doc={item}
              onSave={()=>onSaveDoc(item) }
              onPress={() => {
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
            />
          )}
          initialNumToRender={10} // how many item to display first
          onEndReachedThreshold={2} // so when you are at 5 pixel from the bottom react run onEndReached function
          onEndReached={() => {
            aggregateSearch(query);
          }}
        />
      )}
      {isLoading && <ActivityIndicator />}
      <Snackbar
        style={{bottom: 20}}
        duration={3000}
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}>
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
