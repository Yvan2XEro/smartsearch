import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Portal, Dialog} from 'react-native-paper';
import React, {useEffect, useState} from 'react';

const CiteDialog = ({doi, onDismiss}: {doi:string|null, onDismiss:()=>void}) => {
    const [response, setResponse] = useState("")
    useEffect(() => {
      const URL = `https://citation-needed.springer.com/v2/references/${doi}?format=refman&flavour=citation`;
      fetch(URL).then(
        response => {
          console.log(response);
        },
      );
    }, [doi])
  return (
    <Portal>
      <Dialog visible={!!doi} onDismiss={onDismiss}>
        <TextInput style={{borderRadius: 5}} multiline={true} numberOfLines={4} value="Test de valeure" />
      </Dialog>
    </Portal>
  );
};

export default CiteDialog;

const styles = StyleSheet.create({});
