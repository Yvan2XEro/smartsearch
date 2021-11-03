import React from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import {Document} from '../models/Document';
const DetailScreen = ({route, navigation}: {route: any; navigation: any}) => {
  /* 2. Get the param */
  const document: Document = route.params.document;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ScrollView>
        <Text>Doi: {document.doi}</Text>
        <Text>Title: {document.title}</Text>
        <Text>Publicate Date: {document.publicationDate}</Text>
        <Text>Publisher: {document.publisher}</Text>
        <Text>Open access: {document.openaccess}</Text>
        <Text>
          Authors:
          {document.authors?.reduce(
            (acc, item) => acc + ', ' + item.creator,
            '',
          )}
        </Text>
        <Text>Type: {document.contentType}</Text>
        <Text>Abstract: {document.abstract}</Text>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;
