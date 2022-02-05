import * as React from 'react';
import {
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Modal,
  Portal,
  Text,
} from 'react-native-paper';
import {Document} from '../models/Document';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {User} from '../types';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import AppSnackbar, {appSnackbarStyles} from './AppSnackbar';

const RecModal = ({
  doc,
  onDismiss,
  onFinish,
}: {
  doc: Document | null;
  onDismiss: any;
  onFinish: (success: boolean) => void;
}) => {
  const [fetchedUsers, setFetchedUsers] = React.useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [success, setSucess] = React.useState(true);

  const query = firestore().collection('users').orderBy('email');
  const user = useSelector(({loggedUser}: any) => loggedUser);

  const handleFetch = (text: string) => {
    if (text.length > 0) {
      // Keyboard.dismiss()
      query
        .startAt(text)
        .endAt(text + '~')
        .get()
        .then(snapshot => {
          setFetchedUsers(
            snapshot.docs.map<User>(item => ({
              ...item.data(),
              displayName: item.data().displayName,
              email: item.data().email,
            } as User)).filter(u=>{
              return fetchedUsers.indexOf(u)===-1 && selectedUsers.indexOf(u)===-1
            }),
          );
        });
    }
  };

  const handleRecomandation = async () => {
    await Promise.resolve(
      selectedUsers.forEach(async u => {
        if (u.pk) {
          await firestore()
            .collection('recommandations')
            .add({
              userDestRef: u.pk,
              userSenderRef: user.pk,
              crearedAt: new Date().toISOString(),
              document: doc,
            })
            .then(() => setSucess(true))
            .catch(() => setSucess(false));
        }
      }),
    ).finally(() => {
      setLoading(false);
      onFinish(success);
    });
  };

  return (
    <Portal>
      <Modal
        style={{
          backgroundColor: '#fff',
          justifyContent: 'flex-start',
          padding: 20,
          height: '100%',
        }}
        visible={!!doc}
        // dismissable={false}
        onDismiss={onDismiss}>
        <Text style={{fontSize: 25}}>Recomand doc</Text>
        <View style={{borderWidth: 0.3, borderRadius: 10, overflow: 'hidden'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              onChangeText={handleFetch}
              placeholder="Search users(email) or groups..."
            />
            <Ionicons style={{marginRight: 10}} name="ios-search" size={23} />
          </View>
          <ScrollView
            style={{
              maxHeight: Dimensions.get('window').height / 4,
              backgroundColor: '#E8E8EC',
            }}>
            {fetchedUsers.filter(u=>selectedUsers.indexOf(u)===-1).map((user, i) => (
              <ProfileListItem
                key={i}
                user={user}
                onSelect={() => {
                  if (input != '') {
                    setInput('');
                  }
                  console.log('uuuuuuuuuuuuuuuuu', selectedUsers.indexOf(user));
                  setSelectedUsers([...selectedUsers, user]);
                  setFetchedUsers(fetchedUsers.filter(u => u.pk !== user.pk));
                }}
              />
            ))}
          </ScrollView>
        </View>
        {selectedUsers.length > 0 ? (
          <ScrollView
            style={{
              marginTop: 10,
              borderWidth: 0.2,
              padding: 0.5,
              maxHeight: Dimensions.get('window').height / 3,
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 15,
                marginTop: 10,
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {selectedUsers.map((user, i) => (
                <ProfileBlockItem
                  user={user}
                  key={i}
                  onDelete={() => {
                    setSelectedUsers(selectedUsers.filter(u => u != user));
                    if(fetchedUsers.indexOf(user)===-1)
                      setFetchedUsers([...fetchedUsers, user]);
                  }}
                />
              ))}
            </View>
          </ScrollView>
        ) : (
          <View
            style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
            <SimpleLineIcons name="exclamation" color="red" size={30} />
            <Text style={{marginLeft: 10}}>Please select users or groups!</Text>
          </View>
        )}
        <View>
          <Button
            style={{marginTop: 10}}
            disabled={selectedUsers.length <= 0}
            mode="outlined"
            onPress={() => {
              setLoading(true);
              handleRecomandation();
            }}
            icon={() => (
              <MaterialCommunityIcons
                name="arrow-right"
                color={selectedUsers.length <= 0 ? 'gray' : 'green'}
                size={30}
              />
            )}>
            Process
          </Button>
        </View>
        {loading && (
          <ActivityIndicator
            size="large"
            style={{alignSelf: 'center', zIndex: 2, position: 'absolute'}}
          />
        )}
        <AppSnackbar
          style={appSnackbarStyles}
          visible={showSnackbar}
          onDismiss={() => setShowSnackbar(false)}
          message={snackbarMessage}
        />
      </Modal>
    </Portal>
  );
};

export default RecModal;

const ProfileBlockItem = ({
  user,
  onDelete,
}: {
  user: User;
  onDelete: () => void;
}) => {
  return (
    <Card style={{marginTop: 10, padding: 3, position: 'relative'}}>
      <TouchableOpacity style={{marginLeft: 'auto'}} onPress={onDelete}>
        <FontAwesome5 name="times" color="red" />
      </TouchableOpacity>
      <Avatar.Image
        style={{alignSelf: 'center'}}
        size={30}
        source={{
          uri: user.photoUrl,
        }}
      />
      <Text style={{fontSize: 12, textAlign: 'center'}}>
        {user.displayName}
      </Text>
      <Text style={{fontSize: 10, textAlign: 'center'}}>{user.email}</Text>
    </Card>
  );
};

const ProfileListItem = ({
  user,
  onSelect,
}: {
  user: User;
  onSelect: () => void;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 2,
        paddingHorizontal: 10,
        borderTopWidth: 0.2,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Avatar.Image
          size={30}
          source={{
            uri: user.photoUrl,
          }}
        />
        <View style={{marginLeft: 5}}>
          <Text style={{fontSize: 15}}>{user.email}</Text>
          <Text style={{fontSize: 12}}> {user.displayName}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <MaterialCommunityIcons
          onPress={onSelect}
          name="account-plus-outline"
          size={30}
          color="#000"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
