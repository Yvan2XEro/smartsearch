import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Document} from '../models/Document';
import Entypo from 'react-native-vector-icons/Entypo';
import {Paragraph} from 'react-native-paper';
import DetailsHeader from '../components/DetailsHeader';
import FiltersListModal from '../components/FiltersListModal';

const DetailScreen = ({route, navigation}: {route: any; navigation: any}) => {
  /* 2. Get the param */
  const document: Document = route.params.document;
  const [visible, setVisible] = React.useState(false);
  return (
    <View>
      <DetailsHeader
        navigation={navigation}
        title="Details"
        onSelectFilterList={() => setVisible(true)}
      />
      <View
        style={{
          margin: 5,
        }}>
        <ScrollView style={{marginBottom: 85}}>
          {document.openaccess && (
            <View
              style={{
                width: 100,
                padding: 5,
                borderRadius: 5,
                marginBottom: 20,
                alignSelf: 'center',
                backgroundColor: 'green',
              }}>
              <Entypo
                name="open-book"
                color="white"
                size={25}
                style={{alignSelf: 'center'}}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white',
                }}>
                Open access!
              </Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Title: </Text>
            <View style={{flex: 1}}>
              <Text style={styles.content}>{document.title}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Doi: </Text>
            <View style={{flex: 1}}>
              <Text style={styles.content}>{document.doi}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Publicate Date: </Text>
            <View style={{flex: 1}}>
              <Text style={styles.content}>{document.publicationDate}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Publisher: </Text>
            <View style={{flex: 1}}>
              <Text style={styles.content}>{document.publisher}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Authors: </Text>
            <View style={{flex: 1}}>
              <Text style={styles.content}>
                {document.authors?.reduce(
                  (acc, item) => acc + ', ' + item.creator,
                  '',
                )}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Type :</Text>
            <View style={{flex: 1}}>
              <Text style={styles.content}>{document.contentType}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.label}>Abstract :</Text>
            <Paragraph style={{flex: 1}}>{document.abstract}</Paragraph>
          </View>
        </ScrollView>
      </View>
      <FiltersListModal
        navigation={navigation}
        setVisible={setVisible}
        visible={visible}
      />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    marginHorizontal: 3,
  },
});
