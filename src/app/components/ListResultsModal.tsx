import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modal, Text, Portal} from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppSnackbar, {appSnackbarStyles} from './AppSnackbar';
import {useDispatch, useSelector} from 'react-redux';
import {allQueriesResults} from '../store/queriesResults/selectors';
import {deleteQueryResultAction} from '../store/queriesResults/actions';
import { theme } from '../styles';

const ListResultsModal = ({
  visible,
  onDismiss,
  onSelectItem,
}: {
  visible: boolean;
  onDismiss: any;
  onSelectItem: any;
}) => {
  const queries = useSelector(allQueriesResults);

  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const dispatch = useDispatch();
  const remove = React.useCallback((name: string) => {
    dispatch(deleteQueryResultAction({name}));
    setSnackbarMessage('Deleted!');
    setShowSnackbar(true);
  }, []);

  return (
    <Portal>
      <Modal
        style={{backgroundColor: theme.colors.surface, justifyContent: 'flex-start', paddingHorizontal: 10}}
        visible={visible}
        dismissable={false}
        onDismiss={onDismiss}>
        <TouchableOpacity
          onPress={onDismiss}
          style={{margin: 5, marginBottom: 10}}>
          <AntDesign color={theme.colors.text} name="arrowleft" size={30} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: theme.colors.text}}>Saved queries</Text>
        <View
          style={[
            styles.item,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 15,
              marginBottom: 25,
              backgroundColor: theme.colors.surface,
            },
          ]}>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <SimpleLineIcons color={theme.colors.text} name="trash" size={30} />
            <Text style={{color: theme.colors.text}}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Feather color={theme.colors.text} name="check-square" size={30} />
            <Text style={{color: theme.colors.text}}>Select all</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}} onPress={onDismiss}>
            <MaterialCommunityIcons color={theme.colors.text} name="cancel" size={30} />
            <Text style={{color: theme.colors.text}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        {queries.length > 0 ? (
          <ScrollView style={{marginHorizontal: 5}}>
            {queries.map(({name, createdAt, data, query}: any, i: number) => (
              <View key={i} style={[styles.item]}>
                <TouchableOpacity
                  onPress={() => onSelectItem({data, query})}
                  style={styles.row}>
                  <MaterialCommunityIcons color={theme.colors.text} name="history" size={35} />
                  <View style={{marginLeft: 5, flex: 0.9,}}>
                    <Text>
                      {name.length > 35 ? name.substr(0, 35) + '...' : name}
                    </Text>
                    <Text style={{fontSize: 8}}>
                      {createdAt}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => remove(name)}>
                  <SimpleLineIcons color={theme.colors.text} name="trash" size={25} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View>
            <AntDesign
              name="warning"
              style={{alignSelf: 'center'}}
              size={30}
              color={theme.colors.error}
            />
            <Text style={{fontSize: 18, textAlign: 'center'}}>Empty set!</Text>
          </View>
        )}
      </Modal>
      <AppSnackbar
        style={appSnackbarStyles}
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
    </Portal>
  );
};

export default ListResultsModal;

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    height: 60,
    padding: 5,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
});
