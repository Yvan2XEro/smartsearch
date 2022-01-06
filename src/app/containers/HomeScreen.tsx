import React, { useState } from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Button, Title, Paragraph, Card} from 'react-native-paper';
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { docsSelector } from '../store/docs/selectors';

const HomeScreen = ({ navigation }: { navigation: any }) => {
   const savedDocs = useSelector(docsSelector);
      return (
        <Tabs
          defaultIndex={0}
          uppercase={false}
          style={{backgroundColor: '#fff'}}
          dark={false}
          mode="scrollable"
          showLeadingSpace={true}>
          <TabScreen label="Recomended" icon="alpha-r-circle-outline">
            <ListDocsArticles
              docs={[
                {
                  title:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                },
              ]}
            />
          </TabScreen>
          <TabScreen label="Yours" icon="folder">
            <ListDocsArticles docs={savedDocs.map((d: any) => d.data)} />
          </TabScreen>
          <TabScreen label="Top" icon="star">
            <View style={{flex: 1}} />
          </TabScreen>
        </Tabs>
      );
}

function RecomendedDocs() {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  return (
    <View style={{flex: 1}}>
      <ListDocsArticles
        docs={[
          {title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'},
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({

})

const ListDocsArticles = ({docs}:any) => {
  const {width} = Dimensions.get('window')
  return (
    <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
      <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
        {docs.map((item: any, i: number) => (
          <TouchableOpacity
            key={i}
            style={{
              borderRadius: 5,
              overflow: 'hidden',
              marginBottom: 8,
              marginLeft: 8,
              width: '47%',
              height: 130,
              shadowColor: '#000',
              elevation: 4,
            }}>
            <Card style={{height: '100%', padding: 2}}>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <MaterialCommunityIcons name="file-document" size={60} />
                <Text>
                  {item.title.length > 45
                    ? item.title.substr(0, 45) + '...'
                    : item.title}
                </Text>
              </View>
              <Text></Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
