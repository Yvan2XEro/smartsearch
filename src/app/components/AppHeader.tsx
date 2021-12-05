import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';


const AppHeader = ({navigation, route, title}:{ navigation: any; route: any, title:string|undefined }) => {
    return (
        <View style={styles.header}>
      <Entypo
        onPress={() => navigation.openDrawer()}
        name="menu"
        size={30}
      />
      <View style={{width: '100%', marginLeft: 16}}>
        <Text style={{fontSize: 18}}>{title}</Text>
      </View>
    </View>

    )
}

export default AppHeader
const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingLeft: 16,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1,
    marginLeft: 15,
  },
  icon: {
    marginLeft: 16,
  },
});
