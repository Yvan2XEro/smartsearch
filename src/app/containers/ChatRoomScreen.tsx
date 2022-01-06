import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChatRoomScreen = ({navigation, route}:any) => {
    const {chat} = route.params
    return (
      <View>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={30}
            />
            <View style={{flex: 0.9, marginLeft: 16}}>
              <Text
                style={{
                  fontSize: 17,
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}>
                {chat.user.name}
              </Text>
              <Text style={{textAlign: 'center'}}>Online</Text>
            </View>
            <TouchableOpacity>
              <Entypo name="dots-three-vertical" color="gray" size={25} />
            </TouchableOpacity>
            <View>
              <Text></Text>
            </View>
          </View>
        </View>
      </View>
    );
}

export default ChatRoomScreen

const styles = StyleSheet.create({
  header: {
    paddingLeft: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
  },
});
