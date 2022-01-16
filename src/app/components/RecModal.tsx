import React from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import {Avatar, Modal, Portal, Text} from 'react-native-paper';
import { Document } from '../models/Document';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RecModal = ({
  doc,
  onSubmit,
  onDismiss,
}: {
  doc: Document | null;
  onSubmit: any;
  onDismiss: any;
}) => {
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
        dismissable={false}
        onDismiss={onDismiss}>
        <Text style={{fontSize: 25}}>Recomand doc</Text>
        <View style={{borderWidth: 0.3, borderRadius: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput placeholder="Search users(email) or groups..." />
            <Ionicons style={{marginRight: 10}} name="ios-search" size={23} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Avatar.Image
                size={40}
                source={{
                  uri: 'https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805__340.png',
                }}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 18}}>email@test.com</Text>
                <Text>Remsuate Jean</Text>
              </View>
            </View>
            <TouchableOpacity>
              <MaterialCommunityIcons name="account-plus-outline" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default RecModal

const styles = StyleSheet.create({})
