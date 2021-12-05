import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Modal, Paragraph, Portal} from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {localStorage} from '../services';

const ListResultsModal = ({
  visible,
  onDismiss,
  onSelectItem,
}: {
  visible: boolean;
  onDismiss: any;
  onSelectItem: any;
}) => {
  const [queries, setQueries] = React.useState([]);
  const loadQueries = async () => {
    const queriesString = await localStorage.get('queries');
    if (queriesString !== null) {
      setQueries(JSON.parse(queriesString));
    }
  };
  React.useEffect(() => {
    loadQueries();
  }, []);
  return (
    <Portal>
      <Modal
        style={{backgroundColor: '#fff', alignItems: 'flex-start'}}
        visible={visible}
        onDismiss={onDismiss}>
        <TouchableOpacity
          onPress={onDismiss}
          style={{margin: 5, marginBottom: 10}}>
          <AntDesign name="arrowleft" size={30} />
        </TouchableOpacity>
        <Text style={{fontSize: 25, color: '#000'}}>Saved queries</Text>
        <View
          style={[
            styles.item,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 15,
              marginBottom: 25,
              backgroundColor: '#fff',
            },
          ]}>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <SimpleLineIcons color="black" name="trash" size={30} />
            <Text style={{color: 'black'}}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <Feather color="black" name="check-square" size={30} />
            <Text style={{color: 'black'}}>Select all</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}} onPress={onDismiss}>
            <MaterialCommunityIcons color="black" name="cancel" size={30} />
            <Text style={{color: 'black'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        {queries.length > 0 ? (
          <ScrollView style={{marginHorizontal: 5}}>
            {queries.map(({name, searchedAt, data}, i) => (
              <TouchableOpacity onPress={()=>onSelectItem(data)} style={styles.item} key={i}>
                <MaterialCommunityIcons name="history" size={35} />
                <View style={{marginLeft: 10}}>
                  <Paragraph>{name}</Paragraph>
                  <Text style={{fontSize: 10}}>{searchedAt}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <View>
            <Text>Empty set!</Text>
          </View>
        )}
      </Modal>
    </Portal>
  );
};

export default ListResultsModal;

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    flexDirection: 'row',
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
  },
});
