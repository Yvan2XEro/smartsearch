import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Clipboard as Clip,
} from 'react-native';
import {Portal, Dialog, Button} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

// TODO: Utiliser un bon package pour Clipboard
// import Clipboard from '@react-native-clipboard/clipboard';

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
      <Dialog visible={!!doi} onDismiss={onDismiss}>
        <View style={{padding: 10}}>
          <View>
            <Button
              mode="contained"
              onPress={() => {
                Clip.setString(response);
                // Clipboard.setString(response);
                setBtnText('Text copied!');
              }}
              icon={({color, size}) => (
                <AntDesign name="copy1" color={color} size={size} />
              )}>
              {btnText}
            </Button>
          </View>
          <ScrollView>
            <Text
              style={{
                borderRadius: 5,
                backgroundColor: '#fdfdfd',
                borderWidth: 0.3,
                maxHeight: 350,
              }}>
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
