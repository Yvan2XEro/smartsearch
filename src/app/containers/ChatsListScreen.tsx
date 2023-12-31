import * as React from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChatsListScreen = ({ navigation }: any) => {
    return (
        <View>
            <View style={styles.header}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <Entypo
                        onPress={() => navigation.openDrawer()}
                        name="menu"
                        size={30}
                    />
                    <View style={{ flex: 0.9, marginLeft: 16 }}>
                        <Text style={{ fontSize: 17, textTransform: 'uppercase' }}>
                            Chats
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <MaterialIcons name="notifications" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="ios-search" size={25} />
                    <TextInput
                        placeholder="Search for user..."
                        keyboardType="web-search"
                    />
                </View>
            </View>
            <View style={{ backgroundColor: '#fff' }}>
                <Text style={{ textTransform: 'uppercase', marginLeft: 10 }}>Online users</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <OnlineItem />
                    <OnlineItem />
                    <OnlineItem />
                    <OnlineItem />
                    <OnlineItem />
                    <OnlineItem />
                    <OnlineItem />
                    <OnlineItem />
                    <OnlineItem />
                    <OnlineItem />
                </ScrollView>
            </View>
            <View style={{ backgroundColor: '#fefefe' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ChatItem onPress={() => navigation.navigate("ChatRoom", { chat: { user: { name: "test" } } })} name="Beno Visual" />
                    <ChatItem onPress={() => navigation.navigate("ChatRoom", { chat: { user: { name: "test" } } })} name="Muriel Blanche" />
                    <ChatItem onPress={() => navigation.navigate("ChatRoom", { chat: { user: { name: "test" } } })} name="Massa Moooh" />
                    <ChatItem onPress={() => navigation.navigate("ChatRoom", { chat: { user: { name: "test" } } })} name="Jean Robert" />
                    <ChatItem onPress={() => navigation.navigate("ChatRoom", { chat: { user: { name: "test" } } })} name="Jean Robert" />
                    <ChatItem onPress={() => navigation.navigate("ChatRoom", { chat: { user: { name: "test" } } })} name="Jean Robert" />
                    <ChatItem onPress={() => navigation.navigate("ChatRoom", { chat: { user: { name: "test" } } })} name="Jean Robert" />
                    <ChatItem onPress={() => navigation.navigate("ChatRoom", { chat: { user: { name: "test" } } })} name="Jean Robert" />
                    <ChatItem onPress={() => navigation.navigate("ChatRoom", { chat: { user: { name: "test" } } })} name="Jean Robert" />
                    <ChatItem onPress={() => navigation.navigate("ChatRoom", { chat: { user: { name: "test" } } })} name="Jean Robert" />
                    <ChatItem onPress={() => navigation.navigate("ChatRoom", { chat: { user: { name: "test" } } })} name="Jean Robert" />
                    <ChatItem onPress={() => navigation.navigate("ChatRoom", { chat: { user: { name: "test" } } })} name="Jean Robert" />
                    <ChatItem onPress={() => navigation.navigate("ChatRoom", { chat: { user: { name: "test" } } })} name="Jean Robert" />
                    <ChatItem onPress={() => navigation.navigate("ChatRoom", { chat: { user: { name: "test" } } })} name="Jean Robert" />
                    <ChatItem onPress={() => navigation.navigate("ChatRoom", { chat: { user: { name: "test" } } })} name="Jean Robert" />
                </ScrollView>
            </View>
        </View>
    );
}

export default ChatsListScreen

const OnlineItem = () => (
    <TouchableOpacity style={{ position: 'relative', marginLeft: 5 }}>
        <Avatar.Image
            source={{
                uri: 'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527__340.png',
            }}
            size={40}
        />
        <View
            style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: 'red',
                overflow: 'hidden',
                position: 'absolute',
                bottom: 3,
                right: 3,
            }}
        />
    </TouchableOpacity>
);

const ChatItem = ({ name, onPress }: any) => (
    <TouchableOpacity
        style={{
            marginTop: 10,
            borderWidth: 0.1,
            borderColor: '#000',
            padding: 5,
            backgroundColor: '#fcfcfc',
            borderRadius: 3,
            width: '98%',
            alignSelf: 'center',
        }}
        onPress={onPress}
    >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar.Image
                source={{
                    uri: 'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527__340.png',
                }}
                size={50}
            />
            <Text style={{ marginLeft: 20, fontSize: 17 }}>{name}</Text>
        </View>
    </TouchableOpacity>
);
const styles = StyleSheet.create({
    header: {
        paddingLeft: 16,
        shadowColor: '#000',
        minHeight: 50,
        paddingTop: 8,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff',
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
