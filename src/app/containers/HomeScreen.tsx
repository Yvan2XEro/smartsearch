import * as React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {
  Card,
  Portal,
  Dialog,
  Text,
  ActivityIndicator,
} from 'react-native-paper';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {docsSelector} from '../store/docs/selectors';
import firestore from '@react-native-firebase/firestore';
import {Recommandation, User} from '../types';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {AuthenticationContext} from '../contexts/AuthContextProvider';
import RecModal from '../components/RecModal';
import AppSnackbar, {appSnackbarStyles} from '../components/AppSnackbar';
import moment from 'moment';
import CiteDialog from '../components/CiteDialog';
import {theme} from '../styles';
import {keywordsSelector} from '../store/keywords/selectors';
import * as base from '../api/constants';
import {Notification} from '../services';

const HomeScreen = ({navigation}: {navigation: any}) => {
  const savedDocs = useSelector(docsSelector);
  const reduxUser = useSelector(({loggedUser}: any) => loggedUser);
  const {user} = React.useContext(AuthenticationContext);
  const [recommandations, setRecommandations] = React.useState<
    Recommandation[]
  >([]);
  const [recomandedDoc, setRecomandedDoc] = React.useState<any>(null);
  const [selectedRec, setSelectedRec] = React.useState<Recommandation | null>(
    null,
  );

  // Pour la popup de notification!
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [selectedDoi, setSelectedDoi] = React.useState(null);

  const [recLoading, setRecLoading] = React.useState(false);
  const recommandationsQuery = firestore().collection('recommandations');
  const [refetchCount, setRefetchCount] = React.useState(0);
  React.useEffect(() => {
    if (!!reduxUser || !!user) {
      try {
        setRecLoading(true);

        const s = recommandationsQuery
          .where('userDestRef', '==', reduxUser ? reduxUser.pk : user.uid)
          .onSnapshot(recSnapshots => {
            if (refetchCount === 0) {
              setRefetchCount(p => p + 1);
            } else if (recSnapshots.docs.length > recommandations.length) {
              Notification.push(
                'New document was recomended for you!',
                'New recommendations',
              );
            }
            setRecommandations(
              recSnapshots.docs.map(
                item => ({...item.data(), id: item.id} as Recommandation),
              ),
            );
          });
        return s;
      } catch (error) {
        // TODO: Error
      } finally {
        setRecLoading(false);
      }
    }
  }, [user, reduxUser]);

  const handleDelete = (rec: Recommandation) => {
    recommandationsQuery
      .doc(rec.id)
      .delete()
      .then(() => {
        setRecommandations(recommandations.filter(r => r != rec));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const keyWords = useSelector(keywordsSelector);
  const [yourDocs, setYourDocs] = React.useState<any[]>([]);
  const [loadingYour, setLoadingYour] = React.useState(false);
  const [timer, setTimer] = React.useState<any>(null);

  React.useEffect(() => {
    let w1 = 'sport',
      w2 = 'geography';
    if (keyWords.length === 1) {
      w1 = keyWords[0];
    }
    if (keyWords.length === 2) {
      w2 = keyWords[1];
    }
    if (keyWords.length > 2) {
      w1 = keyWords.sort(() => 0.5 - Math.random())[0];
      while (w1 === w2) {
        w2 = keyWords.sort(() => 0.5 - Math.random())[0];
      }
    }
    (async () => {
      setLoadingYour(true);
      try {
        let response1 = await fetch(
          base.springer_url + `&q=keyword:${w1}` + ' &s=' + 1 + ' &p=' + 20,
        );
        let response2 = await fetch(
          base.springer_url + `&q=keyword:${w2}` + ' &s=' + 1 + ' &p=' + 20,
        );
        const data1 = await response1.json();
        const data2 = await response2.json();
        setTimer(
          setTimeout(() => {
            setClosedHelp(false);
          }, 3000),
        );
        setYourDocs([...data1.records, ...data2.records]);
      } catch (error) {
      } finally {
        setLoadingYour(false);
      }
    })();
  }, [keyWords]);

  const [closedHelp, setClosedHelp] = React.useState(true);
  return (
    <>
      <Tabs
        defaultIndex={0}
        uppercase={false}
        mode="scrollable"
        showLeadingSpace={true}>
        <TabScreen label="For you" icon="book">
          {!loadingYour ? (
            <>
              {keyWords.length === 0 && !closedHelp && (
                <Card
                  style={{marginHorizontal: 15, padding: 10, marginTop: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'center',
                      position: 'relative',
                    }}>
                    <Entypo
                      style={{alignSelf: 'center'}}
                      name="help-with-circle"
                      color={theme.colors.primary}
                      size={30}
                    />
                    <TouchableOpacity
                      style={{right: 10, position: 'absolute'}}
                      onPress={() => {
                        setClosedHelp(true);
                        if (timer) {
                          clearTimeout(timer);
                        }
                      }}>
                      <FontAwesome5
                        name="times"
                        color={theme.colors.error}
                        size={25}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={{fontSize: 17, fontWeight: '600'}}>
                    For better suggestions, you can customize your own keywords
                    in the settings.
                  </Text>
                </Card>
              )}
              <ListDocsArticles
                onSelectDoi={setSelectedDoi}
                onRecomand={setRecomandedDoc}
                navigation={navigation}
                docs={yourDocs.sort(() => 0.5 - Math.random()).slice(0, 40)}
              />
            </>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </TabScreen>
        <TabScreen label="Recomended" icon="alpha-r-circle-outline">
          {!recLoading ? (
            <ScrollView
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}>
              <View
                style={{flexWrap: 'wrap', flexDirection: 'row', marginTop: 10}}>
                {recommandations.map((item, i: number) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(
                        'SearchStack' as never,
                        {
                          screen: 'Details',
                          params: {
                            document: {
                              title: item.document.title,
                              publicationDate: item.document.publicationDate,
                              contentType: item.document.contentType,
                              publisher: item.document.publisher,
                              abstract: item.document.abstract,
                              doi: item.document.doi,
                              openaccess: item.document.openaccess,
                              authors: item.document.creators,
                            } as Document,
                          },
                        } as never,
                      )
                    }
                    key={i}
                    style={{
                      borderRadius: 5,
                      overflow: 'hidden',
                      marginBottom: 8,
                      marginLeft: 8,
                      width: '47%',
                      height: 130,
                      shadowColor: '#000',
                      elevation: 4,
                    }}>
                    <Card style={{height: '100%', padding: 2}}>
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                          }}>
                          <MaterialCommunityIcons
                            name="file-document"
                            color={theme.colors.primary}
                            size={60}
                          />
                          <Menu>
                            <MenuTrigger>
                              <MaterialCommunityIcons
                                name="dots-vertical"
                                color="#000"
                                size={35}
                              />
                            </MenuTrigger>

                            <MenuOptions>
                              <MenuOption onSelect={() => setSelectedRec(item)}>
                                <Text style={{color: theme.colors.text}}>
                                  Details
                                </Text>
                              </MenuOption>
                              <MenuOption
                                onSelect={() =>
                                  setSelectedDoi(item.document.doi)
                                }>
                                <Text style={{color: theme.colors.text}}>
                                  Cite
                                </Text>
                              </MenuOption>
                              <MenuOption
                                onSelect={() =>
                                  setRecomandedDoc(item.document)
                                }>
                                <Text style={{color: theme.colors.text}}>
                                  Recomand
                                </Text>
                              </MenuOption>
                              <MenuOption onSelect={() => handleDelete(item)}>
                                <Text style={{color: 'red'}}>Delete</Text>
                              </MenuOption>
                            </MenuOptions>
                          </Menu>
                        </View>
                        <Text style={{color: theme.colors.text}}>
                          {item.document.title.length > 45
                            ? item.document.title.substr(0, 45) + '...'
                            : item.document.title}
                        </Text>
                      </View>
                      <Text />
                    </Card>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </TabScreen>
        <TabScreen label="Saved" icon="folder">
          <ListDocsArticles
            navigation={navigation}
            onSelectDoi={setSelectedDoi}
            onRecomand={setRecomandedDoc}
            docs={savedDocs.map((d: any) => d.data)}
          />
        </TabScreen>
      </Tabs>
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
      <AppSnackbar
        style={appSnackbarStyles}
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
      <DetailsRecModal
        rec={selectedRec}
        onDismiss={() => setSelectedRec(null)}
      />
      <CiteDialog doi={selectedDoi} onDismiss={() => setSelectedDoi(null)} />
    </>
  );
};

const ListDocsArticles = ({docs, navigation, onSelectDoi, onRecomand}: any) => {
  return (
    <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
      <View style={{flexWrap: 'wrap', flexDirection: 'row', marginTop: 10}}>
        {docs.map((item: any, i: number) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                'SearchStack' as never,
                {
                  screen: 'Details',
                  params: {
                    document: {
                      title: item.title,
                      publicationDate: item.publicationDate,
                      contentType: item.contentType,
                      publisher: item.publisher,
                      abstract: item.abstract,
                      doi: item.doi,
                      openaccess: item.openaccess,
                      authors: item.creators,
                    } as Document,
                  },
                } as never,
              )
            }
            key={i}
            style={{
              borderRadius: 5,
              overflow: 'hidden',
              marginBottom: 8,
              marginLeft: 8,
              width: '47%',
              height: 130,
              shadowColor: '#000',
              elevation: 4,
            }}>
            <Card style={{height: '100%', padding: 2}}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <MaterialCommunityIcons
                  name="file-document"
                  size={60}
                  color={theme.colors.primary}
                />

                <Menu>
                  <MenuTrigger>
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      color="#000"
                      size={35}
                    />
                  </MenuTrigger>

                  <MenuOptions>
                    <MenuOption onSelect={() => onSelectDoi(item.doi)}>
                      <Text style={{color: theme.colors.text}}>Cite</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => onRecomand(item)}>
                      <Text style={{color: theme.colors.text}}>Recomand</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
                <Text style={{color: theme.colors.text}}>
                  {item.title.length > 45
                    ? item.title.substr(0, 45) + '...'
                    : item.title}
                </Text>
              </View>
              <Text />
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const DetailsRecModal = ({
  rec,
  onDismiss,
}: {
  rec: Recommandation | null;
  onDismiss: () => void;
}) => {
  const [u, setU] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    setLoading(true);
    firestore()
      .collection('users')
      .doc(rec?.userSenderRef)
      .get()
      .then(snapshot => {
        setU({...snapshot.data()} as User);
        setLoading(false);
      });
  }, [rec]);
  return (
    <Portal>
      <Dialog
        style={{backgroundColor: '#fff', padding: 10}}
        visible={!!rec}
        onDismiss={onDismiss}>
        <Text style={{fontSize: 28, marginBottom: 10}}>Details</Text>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <Text style={{fontWeight: 'bold'}}>By:</Text>
            {!!u && <Text style={{fontSize: 12}}>{u.displayName}</Text>}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <Text style={{fontWeight: 'bold'}}>Recomanded At:</Text>
            <Text style={{fontSize: 12}}>
              {moment(rec?.createdAt).format('YYYY-MM-DDDD HH:MM')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <Text style={{fontWeight: 'bold'}}>Document:</Text>
            <Text style={{fontSize: 12}}>
              {rec?.document.title.length > 200
                ? rec?.document.title.substr(0, 200) + '...'
                : rec?.document.title}
            </Text>
          </View>
        </View>
      </Dialog>
    </Portal>
  );
};

export default HomeScreen;
