import * as React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import {
  Card,
  Portal,
  Dialog,
  Text,
} from 'react-native-paper';
import {
  Tabs,
  TabScreen,
} from 'react-native-paper-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { docsSelector } from '../store/docs/selectors';
import firestore from '@react-native-firebase/firestore'
import { Recommandation, User } from '../types';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { AuthenticationContext } from '../contexts/AuthContextProvider';
import RecModal from '../components/RecModal';
import AppSnackbar, { appSnackbarStyles } from '../components/AppSnackbar';
import moment from 'moment';
import CiteDialog from '../components/CiteDialog';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const savedDocs = useSelector(docsSelector);
  const reduxUser = useSelector(({loggedUser}: any) => loggedUser);
  const {user} = React.useContext(AuthenticationContext);
  const [recommandations, setRecommandations] = React.useState<Recommandation[]>([]);
  const [recomandedDoc, setRecomandedDoc] = React.useState<Recommandation | null>(null);
  const [selectedRec, setSelectedRec] = React.useState<Recommandation | null>(null);

  // Pour la popup de notification!
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [selectedDoi, setSelectedDoi] = React.useState(null)

  const recommandationsQuery = firestore().collection('recommandations');
  React.useLayoutEffect(() => {
    recommandationsQuery
      .where('userDestRef', '==', reduxUser ? reduxUser.pk : user.uid)
      .onSnapshot(recSnapshots => {
        setRecommandations(
          recSnapshots.docs.map(
            item => ({...item.data(), id: item.id} as Recommandation),
          ),
        );
      });
  }, []);

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

  return (
    <>
      <Tabs
        defaultIndex={0}
        uppercase={false}
        style={{backgroundColor: '#fff'}}
        dark={false}
        mode="scrollable"
        showLeadingSpace={true}>
        <TabScreen label="Recomended" icon="alpha-r-circle-outline">
          <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
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
                          justifyContent: 'space-between',
                        }}>
                        <MaterialCommunityIcons
                          name="file-document"
                          size={60}
                        />
                        <Menu>
                          <MenuTrigger>
                            <MaterialCommunityIcons
                              name="dots-vertical"
                              color="gray"
                              size={25}
                            />
                          </MenuTrigger>

                          <MenuOptions>
                            <MenuOption
                              onSelect={() => setSelectedRec(item)}
                              text="Details"
                            />
                            <MenuOption
                              onSelect={() => setSelectedDoi(item.document.doi)}
                              text="Cite"
                            />
                            <MenuOption
                              onSelect={() => setRecomandedDoc(item)}
                              text="Recomand"
                            />
                            <MenuOption onSelect={() => handleDelete(item)}>
                              <Text style={{color: 'red'}}>Delete</Text>
                            </MenuOption>
                          </MenuOptions>
                        </Menu>
                      </View>
                      <Text>
                        {item.document.title.length > 45
                          ? item.document.title.substr(0, 45) + '...'
                          : item.document.title}
                      </Text>
                    </View>
                    <Text></Text>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </TabScreen>
        <TabScreen label="Yours" icon="folder">
          <ListDocsArticles
            navigation={navigation}
            docs={savedDocs.map((d: any) => d.data)}
          />
        </TabScreen>
        <TabScreen label="Top" icon="star">
          <View style={{flex: 1}} />
        </TabScreen>
      </Tabs>
      {recomandedDoc && (
        <RecModal
          doc={recomandedDoc.document}
          onDismiss={() => setRecomandedDoc(null)}
          onFinish={(succes: boolean) => {
            setShowSnackbar(true);
            if (succes) setSnackbarMessage('SUCCESS!');
            else setSnackbarMessage('An error occcured!');
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
}


const ListDocsArticles = ({ docs, navigation }: any) => {
  return (
    <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
      <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginTop: 10 }}>
        {docs.map((item: any, i: number) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(
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
            )}
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
            <Card style={{ height: '100%', padding: 2 }}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <MaterialCommunityIcons name="file-document" size={60} />
                <Text>
                  {item.title.length > 45
                    ? item.title.substr(0, 45) + '...'
                    : item.title}
                </Text>
              </View>
              <Text></Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const DetailsRecModal = ({rec,onDismiss}:{rec: Recommandation|null, onDismiss:()=>void}) =>{
  const [u, setU] = React.useState<User|null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  React.useEffect(()=>{
    setLoading(true)
    firestore().collection('users').doc(rec?.userSenderRef).get().then((snapshot)=>{
      setU({...snapshot.data()} as User);
      setLoading(false)
    })

  }, [rec])
  return (
    <Portal>
      <Dialog
        style={{backgroundColor: '#fff', padding: 10}}
        visible={!!rec}
        onDismiss={onDismiss}>
          <Text style={{fontSize: 28, marginBottom: 10}}>Deatils</Text>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <Text style={{fontWeight: 'bold'}}>User:</Text>
            {!!u && <Text style={{fontSize: 12}}>{u.displayName}</Text>}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <Text style={{fontWeight: 'bold'}}>Recomanded At:</Text>
            <Text style={{fontSize: 12}}>{moment(rec?.crearedAt).format('YYYY-MM-DDDD HH:MM')}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
            <Text style={{fontWeight: 'bold'}}>Document:</Text>
            <Text style={{fontSize: 12}}>{rec?.document.title}</Text>
          </View>
        </View>
      </Dialog>
    </Portal>
  );
}

export default HomeScreen;
