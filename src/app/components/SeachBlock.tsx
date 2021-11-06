import React, { useEffect, useState } from 'react'
import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Searchbar, Text, TextInput } from 'react-native-paper';
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
    useEffect(() => {
        if (showToggleFiltersBtn)
            setshowToggleFiltersBtn(false)
    }, [])
    return (
        <View style={styles.component}>
            <View style={styles.rowContent}>
                <Searchbar
                    placeholder="Fast Search Here..."
                    onPressIn={() => setshowToggleFiltersBtn(!showToggleFiltersBtn)}
                    onChangeText={text => setFastInputQuery(text)}
                    value={fastInputQuery}
                    onTouchCancel={() => setShowFiltersBlock(false)}
                    onSubmitEditing={handleSumitQuery}
                    style={styles.searchBar}
                />
                {showToggleFiltersBtn && <Button mode="outlined" style={styles.btnToggleFilters} onPress={() => setShowFiltersBlock(!showFiltersBlock)}>
                    {showFiltersBlock ? <MaterialIcons color="gray" size={20} name="cancel" /> : <MaterialCommunityIcons color="gray" size={20} name="text-box-search-outline" />}
                </Button>}
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
        marginBottom: 2
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
        shadowColor: "#red",
        maxWidth: 70,
        padding: 3,
    },
    sumitBtn: {
        backgroundColor: '#fff',
        width: 150,
        marginBottom: 5,
        marginLeft: 'auto',
        borderColor: 'red',
        marginRight: 'auto'
    }
}
))

export default SearchBlock;