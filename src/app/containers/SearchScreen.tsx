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
import {useDispatch} from 'react-redux';
import {saveDocAction} from '../store/docs/actions';
import AppSnackbar, {appSnackbarStyles} from '../components/AppSnackbar';
import {saveNewQueryResultAction} from '../store/queriesResults/actions';
import RecModal from '../components/RecModal';
import CiteDialog from '../components/CiteDialog';
import { theme } from '../styles';

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
  const [selectedDoi, setSelectedDoi] = useState(null);

  // Pour la modale de recommandation
  const [recomandedDoc, setRecomandedDoc] = useState(null);

  // Pour la popup de notification!
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const dispatch = useDispatch();

  // pour enregistrer un resultat
  const onSaveQuery = React.useCallback(() => {
    dispatch(
      saveNewQueryResultAction({
        results: data,
        buildedQuery,
      }),
    );
    setSnackbarMessage('Saved!');
    setShowSnackbar(true);
  }, [data, buildedQuery]);

  React.useEffect(() => {
    setShowSaveQueryButton(data.length > 0);
  }, [data]);

  // When want to save doc in localstorage
  const onSaveDoc = React.useCallback(async (doc: any) => {
    await dispatch(saveDocAction(doc));
    setSnackbarMessage('Doc saved!');
    setShowSnackbar(true);
  }, [buildedQuery]);

  const aggregateSearch = async (q: string, reset:boolean=false) => {
    if(reset) {
      setData([])
      onDataChange(0);
      setCurrentPage(1)
    }
   if(q.length>0) {
      setbuildedQuery(q);
      setLoading(true);
      try {
        const response1 = await fetch(
          base.springer_url +
            `&q=${q}` +
            ' &s=' +
            currentPage +
            ' &p=' +
            10,
        );
        console.log('QUERY: ' + q);
        const response2 = await fetch(base.elsevier_url + `&query=${q}`);
        const json1 = await response1.json();
        const json2 = await response2.json();
        const dat =
          json2['search-results'] && json2['search-results'].entry
            ? json2['search-results'].entry.map((item: any) => {
                return {
                  title: item['dc:title'],
                  publicationDate: item['prism:coverDate'],
                };
              })
            : [];
        setData2(dat);
        setData(data =>
          reset
            ? [...json1.records, ...data2]
            : [...data, ...json1.records, ...data2],
        );
        onDataChange(data.length)
        setCurrentPage(currentPage + 1);
      } catch (error) {
        Alert.alert(error + '');
      } finally {
        setLoading(false);
      }
   }
  };

  const [query, setQuery] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <SearchBlock
        value={query}
        onSelectItem={setData}
        onChangeInputQuery={setQuery}
        navigation={navigation}
        onSubmitInputQuery={(q) => {
          setData([]);
          setData2([]);
          aggregateSearch(q, true);
        }
      }
        showSaveQueryButton={showSaveQueryButton}
        onSaveQuery={onSaveQuery}
      />
      {data && (
        <FlatList
          data={data}
          keyExtractor={({title}, index) => title + index}
          renderItem={({item}) => (
            <DocItem
              doc={item}
              onSave={() => onSaveDoc(item)}
              onRecomand={() => setRecomandedDoc(item)}
              onCite={() => setSelectedDoi(item.doi)}
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
      {isLoading && <ActivityIndicator color={theme.colors.primary} />}
      <AppSnackbar
        style={appSnackbarStyles}
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
      {recomandedDoc && (
        <RecModal
          doc={recomandedDoc}
          onDismiss={() => setRecomandedDoc(null)}
          onFinish={(succes: boolean) => {
            setShowSnackbar(true);
            if (succes) {
              setSnackbarMessage('SUCCESS!');
            } else {
              setSnackbarMessage('An error occcured!');
            }
            setRecomandedDoc(null);
          }}
        />
      )}
      <CiteDialog doi={selectedDoi} onDismiss={() => setSelectedDoi(null)} />
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
