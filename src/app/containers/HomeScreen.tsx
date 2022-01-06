import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Button, Title, Paragraph} from 'react-native-paper';
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';

const HomeScreen = ({ navigation }: { navigation: any }) => {
      return (<Tabs
        defaultIndex={0}
        uppercase={false}
        style={{ backgroundColor:'#fff' }}
        dark={false}
        mode="scrollable" 
        showLeadingSpace={true}
      >
        <TabScreen label="Recomended" icon="compass">
           <ExploreWitHookExamples />
        </TabScreen>
        <TabScreen label="Yours" icon="airplane">
          <View style={{ flex:1 }} />
        </TabScreen>
        <TabScreen
          label="Cited"
          icon="bag-suitcase"
        >
           <View style={{ flex:1 }} />
        </TabScreen>
      </Tabs>
    )
}

function ExploreWitHookExamples() {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  return (
    <View style={{ flex:1 }}>
      <Title>Explore</Title>
      <Paragraph>Index: {index}</Paragraph>
      <Button onPress={() => goTo(1)}>Go to Flights</Button>
    </View>
  );
}

const styles = StyleSheet.create({

})

const Category = ({label}:{label:string})=>{
  return <TouchableOpacity style={{ marginLeft: 30}}>
         <Text>{label}</Text>
         <View style={{height: 5, width: '50%', backgroundColor: 'red', alignSelf: 'center'}} />
       </TouchableOpacity>;
}

export default HomeScreen;
