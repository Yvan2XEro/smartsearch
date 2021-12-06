import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Searchbar, Text, TextInput} from 'react-native-paper';
import {TextInput as RnTextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import ListResultsModal from './ListResultsModal';

interface IProps {
  onChangeInputQuery: (query: string) => void;
  onSubmitInputQuery: () => void;
  value: string;
  showSaveQueryButton: boolean;
  onSaveQuery: any;
  onSelectItem: any;
}
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
const SearchBlock: React.FC<IProps> = ({
  onChangeInputQuery,
  onSubmitInputQuery,
  value,
  showSaveQueryButton,
  onSaveQuery,
  onSelectItem,
}) => {
  const [showFiltersBlock, setShowFiltersBlock] = useState(false);

  const [fastInputQuery, setFastInputQuery] = useState('');
  const [params, setParams] = useState({
    title: '',
    publicationName: '',
    topicalCollection: '',
    issn: '',
    doi: '',
    publisher: '',
    publicationDate: 0,
    volume: 0,
    number: 0,
    issuetype: '',
    keyWords: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleSumitQuery = () => {
    Keyboard.dismiss();
    const query = buildQueryWithInputFilters();
    onChangeInputQuery(query);
    setShowFiltersBlock(false);
    onSubmitInputQuery();
  };
  const buildQueryWithInputFilters = () => {
    let q = '';
    if (fastInputQuery == '') {
      const entriesLength = Object.entries(params).length;
      Object.entries(params).forEach(([key, value], i) => {
        if (key != 'keyWords' && value != '' && value != 0)
          q += `${key}:${value}` + (i < entriesLength - 1 ? ' ' : '');
      });
    } else return fastInputQuery;
    return q;
  };

  return (
    <View style={styles.component}>
      <View style={[styles.rowContent]}>
        <MaterialIcons name="search" size={30} style={{marginTop: 10}} />
        <RnTextInput
          placeholder="Fast Search Here..."
          onChangeText={text => setFastInputQuery(text)}
          value={fastInputQuery}
          onTouchCancel={() => setShowFiltersBlock(false)}
          onSubmitEditing={handleSumitQuery}
          style={styles.searchBar}
        />
        {fastInputQuery != '' && (
          <TouchableOpacity onPress={() => setFastInputQuery('')}>
            <MaterialCommunityIcons
              style={{marginTop: 10, marginRight: 20}}
              name="close-circle"
              size={25}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.searchBarBtn}
          onPress={() => setShowFiltersBlock(!showFiltersBlock)}>
          <MaterialCommunityIcons
            size={25}
            name={showFiltersBlock ? 'filter-menu' : 'filter-menu-outline'}
          />
        </TouchableOpacity>
        <Menu style={{alignSelf: 'center'}}>
          <MenuTrigger>
            <Entypo name="dots-three-vertical" color="gray" size={25} />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={onSaveQuery} disabled={!showSaveQueryButton}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons
                  style={{marginRight: 3}}
                  size={20}
                  name="content-save-all-outline"
                />
                <Text style={!showSaveQueryButton && {color: 'gray'}}>
                  Save this results
                </Text>
              </View>
            </MenuOption>
            <MenuOption onSelect={() => setShowModal(true)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons
                  style={{marginRight: 3}}
                  size={20}
                  name="snippet-folder"
                />
                <Text>Saved results</Text>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <ScrollView style={styles.inputs}>
        {showFiltersBlock && (
          <KeyboardAvoidingView
            style={{marginBottom: 60}}
            behavior={undefined}
            keyboardVerticalOffset={keyboardVerticalOffset}>
            <View style={styles.flexRow}>
              <Entypo name="book" size={50} />
              <TextInput
                theme={{colors: {primary: 'gray'}}}
                style={styles.input}
                onChangeText={text => setParams({...params, title: text})}
                mode="flat"
                label="Title"
              />
            </View>
            <View style={styles.flexRow}>
              <MaterialIcons name="drive-file-rename-outline" size={50} />
              <TextInput
                theme={{colors: {primary: 'gray'}}}
                style={styles.input}
                onChangeText={text =>
                  setParams({...params, publicationName: text})
                }
                mode="flat"
                label="Publication name"
              />
            </View>
            <View style={styles.flexRow}>
              <MaterialCommunityIcons name="identifier" size={50} />
              <TextInput
                theme={{colors: {primary: 'gray'}}}
                style={styles.input}
                onChangeText={text => setParams({...params, doi: text})}
                mode="flat"
                label="Doi"
              />
            </View>
            <View style={styles.flexRow}>
              <MaterialCommunityIcons name="bookshelf" size={50} />
              <TextInput
                theme={{colors: {primary: 'gray'}}}
                style={styles.input}
                onChangeText={text =>
                  setParams({...params, topicalCollection: text})
                }
                mode="flat"
                label="Topical Collection"
              />
            </View>
            <View style={styles.flexRow}>
              <View style={styles.emptyIcons}></View>
              <TextInput
                theme={{colors: {primary: 'gray'}}}
                style={styles.input}
                onChangeText={text => setParams({...params, issn: text})}
                mode="flat"
                label="Issn"
              />
            </View>
            <View style={styles.flexRow}>
              <View style={styles.emptyIcons}></View>
              <TextInput
                theme={{colors: {primary: 'gray'}}}
                style={styles.input}
                onChangeText={text =>
                  setParams({...params, volume: parseInt(text)})
                }
                mode="flat"
                keyboardType="numeric"
                label="Volume"
              />
            </View>
            <View style={styles.flexRow}>
              <MaterialCommunityIcons name="sort-numeric-variant" size={50} />
              <TextInput
                theme={{colors: {primary: 'gray'}}}
                style={styles.input}
                onChangeText={text =>
                  setParams({...params, number: parseInt(text)})
                }
                mode="flat"
                keyboardType="numeric"
                label="Number"
              />
            </View>
            <View style={styles.flexRow}>
              <Entypo name="user" size={47} />
              <TextInput
                theme={{colors: {primary: 'gray'}}}
                style={styles.input}
                onChangeText={text => setParams({...params, publisher: text})}
                mode="flat"
                label="Publisher"
              />
            </View>
            <View style={styles.flexRow}>
              <View style={styles.emptyIcons}></View>
              <TextInput
                theme={{colors: {primary: 'gray'}}}
                style={styles.input}
                onChangeText={text => setParams({...params, issuetype: text})}
                mode="flat"
                label="Issue type"
              />
            </View>
            <View style={styles.flexRow}>
              <MaterialCommunityIcons name="calendar-blank" size={50} />
              <TextInput
                theme={{colors: {primary: 'gray'}}}
                style={styles.input}
                onChangeText={text =>
                  setParams({...params, publicationDate: parseInt(text)})
                }
                keyboardType="numeric"
                mode="flat"
                label="Year"
              />
            </View>
            <View style={styles.flexRow}>
              <View style={styles.emptyIcons}></View>
              <TextInput
                theme={{colors: {primary: 'gray'}}}
                style={styles.input}
                onChangeText={text => setParams({...params, keyWords: text})}
                mode="flat"
                label="Key words"
                placeholder="Ex: security, informatic, network"
              />
            </View>
            <Button
              style={[styles.input, styles.sumitBtn]}
              onPress={handleSumitQuery}>
              <MaterialIcons name="search" color="white" size={20} />
            </Button>
          </KeyboardAvoidingView>
        )}
      </ScrollView>
      <ListResultsModal
        onSelectItem={({data, query}:{data: any[], query: string}) => {
          onChangeInputQuery(query);
          onSelectItem(data);
          setShowModal(false);
        }}
        onDismiss={() => setShowModal(false)}
        visible={showModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    flexDirection: 'column',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  filterBlockInput: {
    marginBottom: 3,
    marginHorizontal: 2,
    flex: 2,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 2,
    backgroundColor: '#fff',
    paddingRight: 10,
    paddingLeft: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchBar: {
    flex: 2,
  },
  inputs: {
    paddingRight: 40,
    paddingLeft: 10,
  },
  input: {
    flex: 2,
    backgroundColor: '#fff',
    height: 50,
    marginBottom: 15,
    borderBottom: 0,
  },
  searchBarBtn: {
    backgroundColor: '#fff',
    maxWidth: 70,
    paddingTop: 13,
    paddingRight: 10,
  },
  sumitBtn: {
    backgroundColor: '#2B49F7',
    paddingTop: 3,
    marginBottom: 5,
    marginLeft: 'auto',
    borderWidth: 0.5,
    width: '100%',
    marginRight: 'auto',
  },
  textInput: {
    height: 40,
    width: '90%',
  },
  closeButton: {
    height: 16,
    width: 16,
  },
  emptyIcons: {
    width: 50,
  },
});

export default SearchBlock;
