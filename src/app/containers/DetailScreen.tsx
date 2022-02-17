import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Document} from '../models/Document';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Paragraph, Text} from 'react-native-paper';
import DetailsHeader from '../components/DetailsHeader';
import FiltersListModal from '../components/FiltersListModal';
import {useSelector} from 'react-redux';
import {settingSelector} from '../store/detailSetting/selectors';
import {DetailSetting} from '../types';
import {theme} from '../styles';

const DetailScreen = ({route, navigation}: {route: any; navigation: any}) => {
  /* 2. Get the param */
  const document: Document = route.params.document;
  const backScreen: string | undefined = route.params.backScreen;
  const settings = useSelector(settingSelector) as DetailSetting;
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
          marginHorizontal: 10,
          marginTop: 10,
          paddingBottom: 5,
        }}>
        <ScrollView style={{marginBottom: 85}}>
          {settings.openaccess && (
            <View style={styles.row}>
              <Text style={styles.label}>Open access:</Text>
              <View>
                {document.openaccess ? <Entypo name="check" size={30} color={theme.colors.primary} /> :
                  <FontAwesome5
                    name="times"
                    size={30}
                    color={theme.colors.error}
                  />
                )}
              </View>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Title: </Text>
            <View style={{flex: 1}}>
              <Text style={styles.content}>{document.title}</Text>
            </View>
          </View>
          {settings.doi && (
            <View style={styles.row}>
              <Text style={styles.label}>Doi: </Text>
              <View style={{flex: 1}}>
                <Text style={styles.content}>{document.doi}</Text>
              </View>
            </View>
          )}
          {settings.publicationDate && (
            <View style={styles.row}>
              <Text style={styles.label}>Publicate Date: </Text>
              <View style={{flex: 1}}>
                <Text style={styles.content}>{document.publicationDate}</Text>
              </View>
            </View>
          )}
          {settings.publisher && (
            <View style={styles.row}>
              <Text style={styles.label}>Publisher: </Text>
              <View style={{flex: 1}}>
                <Text style={styles.content}>{document.publisher}</Text>
              </View>
            </View>
          )}
          {settings.authors && (
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
          )}
          {settings.contentType && (
            <View style={styles.row}>
              <Text style={styles.label}>Type :</Text>
              <View style={{flex: 1}}>
                <Text style={styles.content}>{document.contentType}</Text>
              </View>
            </View>
          )}
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
    marginTop: 6,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    marginHorizontal: 3,
    fontSize: 16,
  },
});
