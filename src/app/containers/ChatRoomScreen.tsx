import React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatRoomScreen = ({ navigation, route }: any) => {
    const { chat } = route.params
    return (
        <View style={{ height: '100%' }}>
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
                    <View style={{ flex: 0.9, marginLeft: 16 }}>
                        <Text
                            style={{
                                fontSize: 17,
                                textTransform: 'uppercase',
                                textAlign: 'center',
                            }}>
                            {chat.user.name}
                        </Text>
                        <Text style={{ textAlign: 'center' }}>Online</Text>
                    </View>
                    <TouchableOpacity style={{ marginLeft: 'auto', }}>
                        <Entypo name="dots-three-vertical" color="gray" size={25} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={[styles.item, styles.leftItem]}>
                        <Avatar.Image
                            style={[styles.image, { left: -10 }]}
                            source={{
                                uri: 'https://cdn.pixabay.com/photo/2017/07/18/23/54/peasants-2517476__340.jpg',
                            }}
                            size={30}
                        />
                        <View style={styles.text}>
                            <Text style={{ color: 'black' }}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing.
                            </Text>
                            <Text style={{ fontSize: 8 }}>09-09-2022 08:09</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.item, styles.rightItem]}>
                        <Avatar.Image
                            style={[styles.image, { right: -10 }]}
                            source={{
                                uri: 'https://cdn.pixabay.com/photo/2017/07/18/23/54/peasants-2517476__340.jpg',
                            }}
                            size={30}
                        />
                        <View style={styles.text}>
                            <Text style={{ color: 'black' }}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing.
                            </Text>
                            <Text style={{ fontSize: 8 }}>09-09-2022 08:09</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    marginBottom: 0,
                    padding: 3,
                    paddingBottom: 10,
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                <TextInput style={[styles.textInput]} placeholder="Type message..." />
                <TouchableOpacity style={{ flex: 0.15, marginLeft: 5 }}>
                    <MaterialCommunityIcons
                        name="send"
                        // color={theme.colors.primary}
                        size={50}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ChatRoomScreen

const styles = StyleSheet.create({
    header: {
        paddingLeft: 10,
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

    image: {
        position: 'absolute',
        top: -0,
    },
    item: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        marginBottom: 3,
        borderRadius: 10,
        padding: 5,
        width: '75%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 30,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3.41,
        elevation: 5,
    },
    leftItem: {
        marginRight: 'auto',
        backgroundColor: '#efeef5',
    },
    rightItem: {
        marginLeft: 'auto',
    },
    text: {
        marginHorizontal: 5,
        marginLeft: 15,
    },
    textInput: {
        flex: 0.85,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
    },
});
