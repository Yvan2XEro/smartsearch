import {View, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {styles} from '../components/DetailsHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from '../styles';
import {Switch, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {settingSelector} from '../store/detailSetting/selectors';
import {updateDetailtingsAction} from '../store/detailSetting/actions';
import {DetailSetting} from '../types';

const DetailSettingScreen = ({navigation}: any) => {
  const settings = useSelector(settingSelector) as DetailSetting;
  const dispatch = useDispatch();
  const setSettings = useCallback(
    (settings: DetailSetting) => {
      dispatch(updateDetailtingsAction(settings));
    },
    [dispatch],
  );
  return (
    <View>
      <View style={[styles.header, {paddingRight: 20}]}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          color="white"
          size={30}
        />
        <View style={{marginLeft: 16, width: '100%'}}>
          <Text
            style={{
              fontSize: 17,
              textTransform: 'uppercase',
              color: 'white',
              fontWeight: 'bold',
            }}>
            DISPLAY DETAILS
          </Text>
        </View>
      </View>
      <View>
        <ListItem
          onToggle={() => setSettings({...settings, title: !settings.title})}
          enabled={settings.title}
          text="title"
          disabled
        />
        <ListItem
          onToggle={() =>
            setSettings({
              ...settings,
              publicationDate: !settings.publicationDate,
            })
          }
          enabled={settings.publicationDate}
          text="publicationDate"
        />
        <ListItem
          onToggle={() =>
            setSettings({...settings, contentType: !settings.contentType})
          }
          enabled={settings.contentType}
          text="contentType"
        />
        <ListItem
          onToggle={() =>
            setSettings({...settings, authors: !settings.authors})
          }
          enabled={settings.authors}
          text="authors"
        />
        <ListItem
          onToggle={() =>
            setSettings({...settings, subject: !settings.subject})
          }
          enabled={settings.subject}
          text="subject"
        />
        <ListItem
          onToggle={() =>
            setSettings({...settings, publisher: !settings.publisher})
          }
          enabled={settings.publisher}
          text="publisher"
        />
        <ListItem
          onToggle={() =>
            setSettings({...settings, abstract: !settings.abstract})
          }
          enabled={settings.abstract}
          text="abstract"
          disabled
        />
        <ListItem
          onToggle={() => setSettings({...settings, doi: !settings.doi})}
          enabled={settings.doi}
          text="doi"
        />
        <ListItem
          onToggle={() =>
            setSettings({...settings, openaccess: !settings.openaccess})
          }
          enabled={settings.openaccess}
          text="openaccess"
        />
      </View>
    </View>
  );
};

const ListItem = ({
  text,
  onToggle,
  enabled,
  disabled = false,
}: {
  text: string;
  onToggle: () => void;
  enabled: boolean;
  disabled?: boolean;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 4,
        paddingHorizontal: 10,
        alignItems: 'flex-start',
        borderBottomWidth: 0.3,
        borderBottomColor: theme.colors.primary,
      }}>
      <SimpleLineIcons
        name="arrow-right"
        size={18}
        color={theme.colors.primary}
        style={{alignSelf: 'center'}}
      />
      <Text
        style={{
          flexWrap: 'wrap',
          fontSize: 19,
          marginLeft: 5,
          flex: 0.95,
          letterSpacing: 0.5,
        }}>
        {text}
      </Text>
      <Switch
        value={enabled}
        onChange={onToggle}
        style={{marginLeft: 'auto'}}
        disabled={disabled}
      />
    </View>
  );
};

export default DetailSettingScreen;
