import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DocItem = ({
  doc,
  onPress,
  onSave,
  onDelete,
}: {
  doc: any;
  onPress: any;
  onSave?: any;
  onDelete?: any;
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
          style={{
            marginRight: 10,
            marginLeft: 0,
            color: 'lightred',
          }}
        />
      )}
      <Text onPress={onPress} style={{flex: 1, flexWrap: 'wrap'}}>
        {(doc as any).title}, {(doc as any).publicationDate}
      </Text>
      <View
        style={{
          alignSelf: 'flex-start',
          position: 'absolute',
          paddingLeft: 15,
          right: 0,
        }}>
        <Menu>
          <MenuTrigger>
            <Icon name="dots-vertical" color="gray" size={20} />
          </MenuTrigger>

          <MenuOptions>
            <MenuOption onSelect={() => {}} text="Cite" />
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
            <MenuOption onSelect={() => {}} disabled={true} text="Recommand" />
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
    padding: 12,
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
