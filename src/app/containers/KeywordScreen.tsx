import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { keywordsSelector } from '../store/keywords/selectors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../styles';
import { styles } from '../components/DetailsHeader';
import { addKeywordAction, deleteKeywordAction } from '../store/keywords/actions';

const KeywordScreen = ({navigation}:any) => {
    const [showDialog, setShowDialog] = useState(false);
    const [keyword, setKeyword] = useState("");
    const keywords = useSelector(keywordsSelector);
    const dispatch = useDispatch()
  return (
    <View>
      <View style={[styles.header, {paddingRight: 20}]}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          color="white"
          size={30}
        />
        <View style={{marginLeft: 16}}>
          <Text
            style={{
              fontSize: 17,
              textTransform: 'uppercase',
              color: 'white',
              fontWeight: 'bold',
            }}>
            KEYWORDS
          </Text>
        </View>
        <TouchableOpacity
          style={{marginLeft: 'auto'}}
          onPress={() => setShowDialog(true)}>
          <Entypo name="plus" size={30} color={theme.colors.surface} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={keywords}
        renderItem={({item}) => <ListItem word={item} />}
      />
      <Portal>
        <Dialog
          visible={showDialog}
          onDismiss={() => setShowDialog(false)}
          style={{backgroundColor: theme.colors.surface, padding: 20}}>
          <Text style={{fontSize: 25, letterSpacing: 0.5}}>New keyword</Text>
          <View style={{marginTop: 10}}>
            <TextInput
              style={{borderWidth: 0.2, borderRadius: 8}}
              value={keyword}
              onChangeText={text => setKeyword(text)}
              placeholder="Type in keyword..."
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
              paddingHorizontal: 10,
            }}>
            <Button
              mode="outlined"
              color={theme.colors.error}
              onPress={() => {
                setKeyword('');
                setShowDialog(false);
              }}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={async () => {
                if (keyword.trim().length > 0) {
                  await dispatch(addKeywordAction(keyword));
                    setKeyword('');
                    setShowDialog(false);
                }
              }}>
              Add
            </Button>
          </View>
        </Dialog>
      </Portal>
    </View>
  );
};


const ListItem = ({word}:{word: string}) =>{
    const dispatch = useDispatch()
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 5,
          alignItems: 'center'
        }}>
        <View style={{flexDirection: 'row', }}>
          <SimpleLineIcons
            name="arrow-right"
            size={18}
            color={theme.colors.primary}
            style={{alignSelf: 'center'}}
          />
          <Text style={{letterSpacing: 0.5, marginLeft: 10}}>{word}</Text>
        </View>
        <TouchableOpacity style={{marginLeft: 'auto'}} onPress={async() =>await dispatch(deleteKeywordAction(word))} >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={30}
            color={theme.colors.error}
          />
        </TouchableOpacity>
      </View>
    );
}

export default KeywordScreen;

