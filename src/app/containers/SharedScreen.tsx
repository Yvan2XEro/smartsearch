import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {loggedUserSelector} from '../store/loggedUser/selectors';
import {Recommandation} from '../types';
import {Card, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const SharedScreen = ({navigation, route}: any) => {
  const user = useSelector(loggedUserSelector);
  const [sendedRec, setSendedRec] = useState<Recommandation[]>([]);
  const [receivedRec, setReceivedRec] = useState<Recommandation[]>([]);

  const sharedQuery = firestore().collection('recommandations');
  useEffect(() => {
    sharedQuery.where('userSenderRef', '==', user.pk).onSnapshot(snapshot => {
      setSendedRec(
        snapshot.docs.map(
          item => ({...item.data(), id: item.id} as Recommandation),
        ),
      );
    });

    sharedQuery.where('userDestRef', '==', user.pk).onSnapshot(snapshot => {
      setReceivedRec(
        snapshot.docs.map(
          item => ({...item.data(), id: item.id} as Recommandation),
        ),
      );
    });
  }, [user]);

  return (
    <View style={{flex: 1}}>
      <Tabs
        defaultIndex={0}
        uppercase={true}
        style={{backgroundColor: '#fff'}}
        dark={false}
        mode="fixed"
        showLeadingSpace={true}>
        <TabScreen label="Sent">
          <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                marginTop: 10,
              }}>
              {sendedRec.map((item, i) => (
                <DocArticle
                  document={item.document}
                  icon={<FontAwesome name="send-o" size={20} />}
                  key={i}
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
                          backScreen: 'SharedScreen',
                        },
                      } as never,
                    )
                  }
                />
              ))}
            </View>
          </ScrollView>
        </TabScreen>
        <TabScreen label="Received">
          <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
            <View
              style={{flexWrap: 'wrap', flexDirection: 'row', marginTop: 10}}>
              {receivedRec.map((item, i) => (
                <DocArticle
                  document={item.document}
                  key={i}
                  icon={<Entypo name="download" size={20} />}
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
                          backScreen: 'SharedScreen',
                        },
                      } as never,
                    )
                  }
                />
              ))}
            </View>
          </ScrollView>
        </TabScreen>
      </Tabs>
    </View>
  );
};

export default SharedScreen;

const DocArticle = ({
  document,
  onPress,
  icon,
}: {
  document: any;
  onPress: () => void;
  icon: any;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 8,
        marginLeft: 8,
        width: '47%',
        height: 170,
        shadowColor: '#000',
        elevation: 4,
      }}>
      <Card style={{height: '100%', padding: 2}}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <MaterialCommunityIcons name="file-document" size={60} />
          <Text>
            {document.title.length > 45
              ? document.title.substr(0, 45) + '...'
              : document.title}
          </Text>
        </View>
        <View style={{bottom: 10, position: 'absolute', width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 10}}>
              2020-21-09 08:09
            </Text>
            {icon}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
