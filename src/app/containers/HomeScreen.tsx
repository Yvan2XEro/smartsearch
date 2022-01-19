import * as React from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Title, Paragraph, Card } from 'react-native-paper';
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { docsSelector } from '../store/docs/selectors';
import firestore from '@react-native-firebase/firestore'
import { Recommandation } from '../types';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const savedDocs = useSelector(docsSelector);
  const user = useSelector(({loggedUser}: any) => loggedUser);
  const [recommandations, setRecommandations] = React.useState<Recommandation[]>([])
  const recommandationsQuery = firestore().collection('recommandations');
  React.useLayoutEffect(() =>{
    recommandationsQuery.where('userDestRef', '==', user.pk)
    .onSnapshot(recSnapshots=>{
      setRecommandations(
        recSnapshots.docs.map(
          item => ({...item.data(), id: item.id} as Recommandation),
        ),
      );
    });
  },[])

  const handleDelete = (rec: Recommandation) => {
    recommandationsQuery.doc(rec.id).delete().then(()=>{
      setRecommandations(recommandations.filter(r=>r!=rec))
    }).catch(err=>{
      console.log(err)
    });
  }

  return (
    <Tabs
      defaultIndex={0}
      uppercase={false}
      style={{backgroundColor: '#fff'}}
      dark={false}
      mode="scrollable"
      showLeadingSpace={true}>
      <TabScreen label="Recomended" icon="alpha-r-circle-outline">
        <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
          <View style={{flexWrap: 'wrap', flexDirection: 'row', marginTop: 10}}>
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
                      <MaterialCommunityIcons name="file-document" size={60} />
                      <Menu>
                        <MenuTrigger>
                          <MaterialCommunityIcons
                            name="dots-vertical"
                            color="gray"
                            size={25}
                          />
                        </MenuTrigger>

                        <MenuOptions>
                          <MenuOption onSelect={() => {}} text="Details" />
                            <MenuOption onSelect={()=>handleDelete(item)}>
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

export default HomeScreen;
