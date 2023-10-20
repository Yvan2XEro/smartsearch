import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {List, Modal, Portal} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FiltersListModal = ({
  navigation,
  setVisible,
  visible,
}: {
  navigation: any;
  setVisible: any;
  visible: boolean;
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        style={{backgroundColor: '#fff', justifyContent: 'flex-start'}}>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={{margin: 5, marginBottom: 10}}>
          <AntDesign name="arrowleft" size={30} />
        </TouchableOpacity>
        <View>
          <Text style={{fontSize: 20, color: '#000', textAlign: 'center'}}>
            Display details filters
          </Text>
          <List.Section title="Filters">
            <List.Accordion
              title="Default filter"
              left={props => <List.Icon {...props} icon="folder" />}>
              <List.Item title="First item" />
              <List.Item title="Second item" />
            </List.Accordion>
          </List.Section>
        </View>
      </Modal>
    </Portal>
  );
};

export default FiltersListModal;

const styles = StyleSheet.create({});
