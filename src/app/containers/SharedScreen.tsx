import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {loggedUserSelector} from '../store/loggedUser/selectors';
import {Recommandation, User} from '../types';
import {Card, Dialog, Portal, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import { theme } from '../styles';

const SharedScreen = ({navigation, route}: any) => {
  const user = useSelector(loggedUserSelector);
  const [sendedRec, setSendedRec] = useState<Recommandation[]>([]);
  const [receivedRec, setReceivedRec] = useState<Recommandation[]>([]);
  const [selectedRec, setSelectedRec] = useState<Recommandation|null>(null)

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
                  createdAt={item.createdAt}
                  icon={
                    <FontAwesome
                      name="send-o"
                      size={20}
                      color={theme.colors.primary}
                    />
                  }
                  key={i}
                  onPress={() => setSelectedRec(item)}
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
                  createdAt={item.createdAt}
                  key={i}
                  icon={
                    <Entypo
                      name="download"
                      size={20}
                      color={theme.colors.primary}
                    />
                  }
                  onPress={() => setSelectedRec(item)}
                />
              ))}
            </View>
          </ScrollView>
        </TabScreen>
      </Tabs>
      <DetailShared rec={selectedRec} onDismiss={() => setSelectedRec(null)} />
    </View>
  );
};

export default SharedScreen;

const DocArticle = ({
  document,
  createdAt,
  onPress,
  icon,
}: {
  document: any;
  onPress: () => void;
  createdAt: string;
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
            <Text style={{fontWeight: 'bold', fontSize: 10, color: theme.colors.primary}}>
              {moment(createdAt).format('YYYY-MM-DDDD HH:MM')}
            </Text>
            {icon}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};


const DetailShared = ({
  rec,
  onDismiss,
}: {
  rec: Recommandation | null;
  onDismiss: () => void;
}) => {
  const [u, setU] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [byMe, setByMe] = React.useState<boolean>(true)
  const user = useSelector(loggedUserSelector)
  React.useEffect(() => {
    setLoading(true);
    if(!!rec) {
      setByMe(rec?.userSenderRef===user.pk)
      firestore()
        .collection('users')
        .doc(byMe?rec?.userDestRef:rec.userSenderRef)
        .get()
        .then(snapshot => {
          setU({...snapshot.data()} as User);
        })
        .finally(() => setLoading(false));
    }
  }, [rec]);
  return (
    <Portal>
      <Dialog
        style={{backgroundColor: '#fff', padding: 10}}
        visible={!!rec}
        onDismiss={()=>{
          setU(null)
          onDismiss();
        }}>
        <Text style={{fontSize: 28, marginBottom: 10, color: theme.colors.primary}}>Details</Text>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <Text style={{fontWeight: 'bold'}}>{ byMe? "To:": "By:"}</Text>
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

const styles = StyleSheet.create({});
