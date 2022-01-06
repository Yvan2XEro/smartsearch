import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Text} from 'react-native-paper';
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
import SearchInput from './shared/SearchInput';

interface IProps {
  onChangeInputQuery: (query: string) => void;
  onSubmitInputQuery: () => void;
  value: string;
  showSaveQueryButton: boolean;
  onSaveQuery: any;
  onSelectItem: any;
  navigation: any;
}
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
const SearchBlock: React.FC<IProps> = ({
  onChangeInputQuery,
  onSubmitInputQuery,
  value,
  showSaveQueryButton,
  onSaveQuery,
  onSelectItem,
  navigation,
}) => {
  const [showFiltersBlock, setShowFiltersBlock] = useState(false);
  const [fastInputQuery, setFastInputQuery] = useState(value);
  const [params, setParams] = useState({
    title: '',
    publicationName: '',
    topicalCollection: '',
    authorName: '',
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
    <View style={{flexDirection: 'column'}}>
      <View style={[styles.rowContent]}>
        <MaterialIcons
        onPress={() =>navigation.openDrawer()}
          name="apps"
          size={marginLeftInput}
          style={{marginTop: 10}}
        />
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
            <SearchInput
              label="Title"
              onChangeText={(text: string) =>
                setParams({...params, title: text})
              }
              fieldIcon={<Entypo name="book" size={marginLeftInput} />}
            />
            <SearchInput
              onChangeText={(text: string) =>
                setParams({...params, publicationName: text})
              }
              fieldIcon={
                <MaterialIcons
                  name="drive-file-rename-outline"
                  size={marginLeftInput}
                />
              }
              label="Publication name"
            />
            <SearchInput
              label="Author"
              onChangeText={(text: string) =>
                setParams({...params, authorName: text})
              }
              fieldIcon={<Entypo name="user" size={marginLeftInput - 3} />}
            />
            <SearchInput
              onChangeText={(text: string) => setParams({...params, doi: text})}
              fieldIcon={
                <MaterialCommunityIcons
                  name="identifier"
                  size={marginLeftInput}
                />
              }
              label="Doi"
            />
            <SearchInput
              onChangeText={(text: string) =>
                setParams({...params, topicalCollection: text})
              }
              fieldIcon={
                <MaterialCommunityIcons
                  name="bookshelf"
                  size={marginLeftInput}
                />
              }
              label="Topical Collection"
            />
            <SearchInput
              onChangeText={(text: string) =>
                setParams({...params, issn: text})
              }
              fieldIcon={<EmptyIcon />}
              label="Issn"
            />
            <SearchInput
              keyboardType="numeric"
              label="Volume"
              onChangeText={(text: number) =>
                setParams({...params, volume: text})
              }
              fieldIcon={<EmptyIcon />}
            />
            <SearchInput
              keyboardType="numeric"
              label="Number"
              onChangeText={(text: number) =>
                setParams({...params, number: text})
              }
              fieldIcon={
                <MaterialCommunityIcons
                  name="sort-numeric-variant"
                  size={marginLeftInput}
                />
              }
            />
            <SearchInput
              label="Publisher"
              onChangeText={(text: string) =>
                setParams({...params, publisher: text})
              }
              fieldIcon={<Entypo name="user" size={marginLeftInput - 3} />}
            />
            <SearchInput
              label="Issue type"
              onChangeText={(text: string) =>
                setParams({...params, publisher: text})
              }
              fieldIcon={<EmptyIcon />}
            />
            <SearchInput
              keyboardType="numeric"
              label="Year"
              onChangeText={(text: number) =>
                setParams({...params, publicationDate: text})
              }
              fieldIcon={
                <MaterialCommunityIcons
                  name="calendar-blank"
                  size={marginLeftInput}
                />
              }
            />
            <SearchInput
              keyboardType="numeric"
              onChangeText={(text: string) =>
                setParams({...params, keyWords: text})
              }
              fieldIcon={<EmptyIcon />}
              label="Key words"
              placeholder="Ex: security, informatic, network"
            />
            <Button
              style={[styles.input, styles.sumitBtn]}
              onPress={handleSumitQuery}>
              <MaterialIcons name="search" color="white" size={20} />
            </Button>
          </KeyboardAvoidingView>
        )}
      </ScrollView>
      <ListResultsModal
        onSelectItem={({data, query}: {data: any[]; query: string}) => {
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

const EmptyIcon = () => <View style={{width: marginLeftInput}}/>;
const marginLeftInput = 30

const styles = StyleSheet.create({
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
    paddingHorizontal: 40
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
  }
});

export default SearchBlock;
