import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import {Portal,Text, Dialog, Button} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppClipBoard} from '../services'


const CiteDialog = ({
  doi,
  onDismiss,
}: {
  doi: string | null;
  onDismiss: () => void;
}) => {
  const [response, setResponse] = useState('');
  const [btnText, setBtnText] = useState('');
  useEffect(() => {
    setBtnText('Copy text');
    const URL = `https://citation-needed.springer.com/v2/references/${doi}?format=refman&flavour=citation`;
    fetch(URL).then(async response => setResponse(await response.text()));
  }, [doi]);
  return (
    <Portal>
      <Dialog style={{paddingBottom: 0}} visible={!!doi} onDismiss={onDismiss}>
        <View style={{padding: 10}}>
          <View>
            <Button
              mode="contained"
              onPress={() => {
                AppClipBoard.setString(response);
                setBtnText('Text copied!');
              }}
              icon={({color, size}) => (
                <AntDesign name="copy1" color={color} size={size} />
              )}>
              {btnText}
            </Button>
          </View>
          <ScrollView
            style={{height: '80%', borderRadius: 5, borderWidth: 0.3, marginTop: 10, padding: 3}}>
            <Text
              style={
                {
                  // backgroundColor: '#fdfdfd',
                  // maxHeight: 350,
                }
              }>
              {response}
            </Text>
          </ScrollView>
        </View>
      </Dialog>
    </Portal>
  );
};

export default CiteDialog;

const styles = StyleSheet.create({});
