import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../styles';

const DocItem = ({
  doc,
  onPress,
  onSave,
  onDelete,
  onCite,
  onRecomand,
}: {
  doc: any;
  onPress: any;
  onSave?: any;
  onCite?: () => void;
  onDelete?: any;
  onRecomand?: any;
}) => {
  return (
    <View style={styles.doc}>
      {(doc as any).contentType !== 'Article' ? (
        <Icon
          name="book"
          size={30}
          style={{
            marginRight: 10,
            marginLeft: 0,
            color: 'purple',
          }}
        />
      ) : (
        <MaterialIcons
          name="article"
          size={30}
          // color={theme.colors.onSurface}
          color="purple"
          style={{
            marginRight: 10,
            marginLeft: 0,
            // color: '#580258',
          }}
        />
      )}
      <Text onPress={onPress} style={{flex: 0.8, flexWrap: 'wrap'}}>
        {(doc as any).title}, {(doc as any).publicationDate}
      </Text>
      <View
        style={{
          flex: 0.1,
          alignSelf: 'center',
          marginLeft: 'auto',
        }}>
        <Menu>
          <MenuTrigger>
            <Icon name="dots-vertical" color="black" size={30} />
          </MenuTrigger>

          <MenuOptions>
            {onCite && (
              <MenuOption onSelect={onCite}>
                <Text>Cite</Text>
              </MenuOption>
            )}
            {onSave && (
              <MenuOption onSelect={onSave}>
                <Text style={{color: 'red'}}>Save</Text>
              </MenuOption>
            )}
            {onDelete && (
              <MenuOption onSelect={onDelete}>
                <Text style={{color: 'red'}}>Delete</Text>
              </MenuOption>
            )}
            {onRecomand && (
              <MenuOption onSelect={onRecomand}>
                <Text>Recommand</Text>
              </MenuOption>
            )}
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default DocItem;

const styles = StyleSheet.create({
  doc: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    paddingVertical: 10,
    paddingLeft: 8,
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: 'white',
    margin: 5,
  },
});
