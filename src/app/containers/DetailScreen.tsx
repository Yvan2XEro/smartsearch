import React from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Document} from '../models/Document';
const DetailScreen = ({route, navigation}: {route: any; navigation: any}) => {
  /* 2. Get the param */
  const document: Document = route.params.document;
  return (
    <View
      style={{
        margin: 5,
      }}>
      <ScrollView>
        <View style={styles.row}>
          <Text style={styles.label}>Title: </Text>
          <View style={{flex: 1}}><Text style={styles.content}>{document.title}</Text></View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Doi: </Text>
          <View style={{flex:1}}><Text style={styles.content}>{document.doi}</Text></View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Publicate Date: </Text>
          <View style={{flex:1}}><Text style={styles.content}>{document.publicationDate}</Text></View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Publisher: </Text>
          <View style={{flex:1}}><Text style={styles.content}>{document.publisher}</Text></View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Authors: </Text>
          <View style={{flex:1}}><Text style={styles.content}>{document.authors?.reduce(
            (acc, item) => acc + ', ' + item.creator,
            '',
          )}</Text></View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Type :</Text>
          <View style={{flex:1}}><Text style={styles.content}>{document.contentType}</Text></View>
        </View>
        <View>
          <Text style={styles.label}>Abstract :</Text>
          <View style={{flex:1}}><Text style={styles.content}>{document.abstract}</Text></View>
        </View>
        <Text>Open access: {document.openaccess}</Text>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
label: {
  fontWeight: 'bold',
  fontSize: 16,
},
content: {
  marginHorizontal: 3,
}
})