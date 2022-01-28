import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Document} from '../models/Document';
import Entypo from 'react-native-vector-icons/Entypo';
import {Paragraph, Text as PaperText} from 'react-native-paper';
import DetailsHeader from '../components/DetailsHeader';
import FiltersListModal from '../components/FiltersListModal';

const DetailScreen = ({route, navigation}: {route: any; navigation: any}) => {
  /* 2. Get the param */
  const document: Document = route.params.document;
  const backScreen: string|undefined = route.params.backScreen;
  const [visible, setVisible] = React.useState(false);
  return (
    <View>
      <DetailsHeader
        navigation={navigation}
        title="Details"
        backScreen={backScreen}
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
            <PaperText style={styles.label}>Title: </PaperText>
            <View style={{flex: 1}}>
              <Text style={styles.content}>{document.title}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <PaperText style={styles.label}>Doi: </PaperText>
            <View style={{flex: 1}}>
              <Text style={styles.content}>{document.doi}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <PaperText style={styles.label}>Publicate Date: </PaperText>
            <View style={{flex: 1}}>
              <Text style={styles.content}>{document.publicationDate}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <PaperText style={styles.label}>Publisher: </PaperText>
            <View style={{flex: 1}}>
              <Text style={styles.content}>{document.publisher}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <PaperText style={styles.label}>Authors: </PaperText>
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
            <PaperText style={styles.label}>Type :</PaperText>
            <View style={{flex: 1}}>
              <Text style={styles.content}>{document.contentType}</Text>
            </View>
          </View>
          <View>
            <PaperText style={styles.label}>Abstract :</PaperText>
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
