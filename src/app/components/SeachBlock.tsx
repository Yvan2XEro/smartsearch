import React, { useEffect, useState } from 'react'
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Searchbar, Text, TextInput } from 'react-native-paper';
import { TextInput as RnTextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps {
    onChangeInputQuery: (query: string) => void,
    onSubmitInputQuery: () => void,
    value: string
}
const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
const SearchBlock: React.FC<IProps> = ({ onChangeInputQuery, onSubmitInputQuery, value }) => {

    const [showFiltersBlock, setShowFiltersBlock] = useState(false)

    const [fastInputQuery, setFastInputQuery] = useState('')
    const [showToggleFiltersBtn, setshowToggleFiltersBtn] = useState(false)
    const [params, setParams] = useState({
        title: '',
        publicationName: '',
        topicalCollection: '',
        issn: '',
        doi: '',
        publisher: '',
        publicationDate: 0,
        volume: 0,
        number: 0,
        issuetype: '',
        keyWords: ''
    })

    const handleSumitQuery = () => {
        Keyboard.dismiss();
        const query = buildQueryWithInputFilters()
        onChangeInputQuery(query)
        setShowFiltersBlock(false)
        setshowToggleFiltersBtn(false)
        onSubmitInputQuery()
    }
    const buildQueryWithInputFilters = () => {
        let q = ""
        if (fastInputQuery == '') {
            const entriesLength = Object.entries(params).length
            Object.entries(params).forEach(([key, value], i) => {
                if (key != 'keyWords' && value != '' && value != 0)
                    q += `${key}:${value}` + (i < entriesLength - 1 ? ' ' : '')
            })
        } else
            return fastInputQuery
        return q
    }
    const handleToggleBtn = () => {
        if (!showFiltersBlock) {
            setshowToggleFiltersBtn(false)
        }
    }
    useEffect(() => {
        if (showToggleFiltersBtn)
            setshowToggleFiltersBtn(false)
    }, [])
    return (
        <View style={styles.component}>
            <View style={[styles.rowContent]}>
                <MaterialIcons name="search" size={25} style={{ marginTop: 10 }} />
                <RnTextInput
                    placeholder="Fast Search Here..."
                    onFocus={() => setshowToggleFiltersBtn(true)}
                    onBlur={() => handleToggleBtn()}
                    onPressIn={() => setshowToggleFiltersBtn(!showToggleFiltersBtn)}
                    onChangeText={text => setFastInputQuery(text)}
                    value={fastInputQuery}
                    onTouchCancel={() => setShowFiltersBlock(false)}
                    onSubmitEditing={handleSumitQuery}
                    style={styles.searchBar}
                />
                {fastInputQuery != '' &&
                    <TouchableOpacity onPress={() => setFastInputQuery('')}>
                        <MaterialCommunityIcons style={{ marginTop: 10, marginRight: 20 }} name="close-circle" size={25} />
                    </TouchableOpacity>
                }
                {showToggleFiltersBtn &&
                    <TouchableOpacity style={styles.btnToggleFilters} onPress={() => setShowFiltersBlock(!showFiltersBlock)}>
                        <MaterialCommunityIcons color={showFiltersBlock ? "red" : "green"} size={25} name="text-search" />
                    </TouchableOpacity>
                }
            </View>
            <ScrollView style={styles.inputs}>
                {showToggleFiltersBtn && showFiltersBlock &&
                    <KeyboardAvoidingView style={{ marginBottom: 60 }} behavior={undefined} keyboardVerticalOffset={keyboardVerticalOffset} >
                        <TextInput theme={{ colors: { primary: 'gray' } }} style={styles.input} onChangeText={text => setParams({ ...params, title: text })} mode='flat' label="Title" />
                        <TextInput theme={{ colors: { primary: 'gray' } }} style={styles.input} onChangeText={text => setParams({ ...params, publicationName: text })} mode='flat' label="Publication name" />
                        <TextInput theme={{ colors: { primary: 'gray' } }} style={styles.input} onChangeText={text => setParams({ ...params, doi: text })} mode='flat' label="Doi" />
                        <TextInput theme={{ colors: { primary: 'gray' } }} style={styles.input} onChangeText={text => setParams({ ...params, topicalCollection: text })} mode='flat' label="Topical Collection" />
                        <TextInput theme={{ colors: { primary: 'gray' } }} style={styles.input} onChangeText={text => setParams({ ...params, issn: text })} mode='flat' label="Issn" />
                        <TextInput theme={{ colors: { primary: 'gray' } }} style={styles.input} onChangeText={text => setParams({ ...params, volume: parseInt(text) })} mode='flat' keyboardType="numeric" label="Volume" />
                        <TextInput theme={{ colors: { primary: 'gray' } }} style={styles.input} onChangeText={text => setParams({ ...params, number: parseInt(text) })} mode='flat' keyboardType="numeric" label="Number" />
                        <TextInput theme={{ colors: { primary: 'gray' } }} style={styles.input} onChangeText={text => setParams({ ...params, publisher: text })} mode='flat' label="Publisher" />
                        <TextInput theme={{ colors: { primary: 'gray' } }} style={styles.input} onChangeText={text => setParams({ ...params, issuetype: text })} mode='flat' label="Issue type" />
                        <TextInput theme={{ colors: { primary: 'gray' } }} style={styles.input} onChangeText={text => setParams({ ...params, publicationDate: parseInt(text) })} keyboardType="numeric" mode='flat' label="Year" />
                        <TextInput theme={{ colors: { primary: 'gray' } }} style={styles.input} onChangeText={text => setParams({ ...params, keyWords: text })} mode='flat' label="Key words" placeholder="Ex: security, informatic, network" />
                        <Button style={[styles.input, styles.sumitBtn]} onPress={handleSumitQuery}><MaterialIcons name="search" color="gray" size={20} /></Button>
                    </KeyboardAvoidingView>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create(({
    component: {
        flexDirection: 'column',
    },
    filterBlockInput: {
        marginBottom: 3,
        marginHorizontal: 2,
        flex: 2
    },
    rowContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 2,
        backgroundColor: '#fff',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingRight: 10,
        paddingLeft: 10
    },
    searchBar: {
        flex: 2,
    },
    inputs: {
        paddingRight: 40,
        paddingLeft: 10
    },
    input: {
        backgroundColor: '#fff',
        height: 50,
        marginBottom: 15,
        borderBottom: 0
    },
    btnToggleFilters: {
        backgroundColor: '#fff',
        maxWidth: 70,
        paddingTop: 13,
        paddingRight: 10,
    },
    sumitBtn: {
        borderColor: '#e91e63',
        paddingTop: 3,
        marginBottom: 5,
        marginLeft: 'auto',
        borderWidth: 0.5,
        width: '100%',
        marginRight: 'auto'
    },
    textInput: {
        height: 40,
        width: "90%",
    },
    closeButton: {
        height: 16,
        width: 16,
    },
}
))

export default SearchBlock;