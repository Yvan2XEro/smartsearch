import React, { useRef, useState } from 'react'
import { Dimensions, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, List, Searchbar, TextInput } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IProps {
    onChangeInputQuery: (query: string) => void,
    onSubmitInputQuery: () => void,
    value: string
}

const SearchBlock: React.FC<IProps> = ({ onChangeInputQuery, onSubmitInputQuery, value }) => {

    const [showFiltersBlock, setShowFiltersBlock] = useState(false)

    const [fastInputQuery, setFastInputQuery] = useState('')

    const [params, setParams] = useState({
        title: '',
        publicationName: '',
        topicalCollection: '',
        issn: '',
        doi: '',
        publisher: '',
        publicationDate: 2000,
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
        onSubmitInputQuery()
    }
    const buildQueryWithInputFilters = () => {
        let q = ""
        if (fastInputQuery != '') {
            const entriesLength = Object.entries(params).length
            Object.entries(params).forEach(([key, value], i) => {
                if (key != 'keyWords' && value != '' && value != 0)
                    q += `${key}:${value}` + (i < entriesLength - 1 ? ' ' : '')
            })
        } else
            return fastInputQuery
        return q
    }

    return (
        <View>
            <Searchbar
                placeholder="Fast Search Here..."
                onPressIn={() => setShowFiltersBlock(true)}
                onFocus={() => setShowFiltersBlock(true)}
                onChangeText={text => setFastInputQuery(text)}
                value={fastInputQuery}
                onTouchCancel={() => setShowFiltersBlock(false)}
                onSubmitEditing={handleSumitQuery}
            />

            <View >
                <Button onPress={() => setShowFiltersBlock(!showFiltersBlock)}>
                    {showFiltersBlock && <MaterialIcons name="close" />}
                    <Text >Advenced Search</Text>
                </Button>
                {showFiltersBlock &&
                    <ScrollView>
                        <View style={styles.filtersRow}>
                            <View style={[styles.filterBlockInput]}>
                                <TextInput onChangeText={text => setParams({ ...params, title: text })} mode='flat' label="Title" />
                            </View>
                            <View style={[styles.filterBlockInput]}>
                                <TextInput onChangeText={text => setParams({ ...params, publicationName: text })} mode='flat' label="Publication name" />
                            </View>
                        </View>
                        <View style={styles.filtersRow}>
                            <View style={[styles.filterBlockInput]}>
                                <TextInput onChangeText={text => setParams({ ...params, doi: text })} mode='flat' label="Doi" />
                            </View>
                            <View style={[styles.filterBlockInput]}>
                                <TextInput onChangeText={text => setParams({ ...params, topicalCollection: text })} mode='flat' label="Topical Collection" />
                            </View>
                        </View>
                        <View style={styles.filtersRow}>
                            <View style={[styles.filterBlockInput, { flex: 3 }]}>
                                <TextInput onChangeText={text => setParams({ ...params, issn: text })} mode='flat' label="Issn" />
                            </View>
                            <View style={[styles.filterBlockInput, { flex: 3 }]}>
                                <TextInput onChangeText={text => setParams({ ...params, volume: parseInt(text) })} mode='flat' keyboardType="numeric" label="Volume" />
                            </View>
                            <View style={[styles.filterBlockInput, { flex: 3 }]}>
                                <TextInput onChangeText={text => setParams({ ...params, number: parseInt(text) })} mode='flat' keyboardType="numeric" label="Number" />
                            </View>
                        </View>
                        <View style={styles.filtersRow}>
                            <View style={[styles.filterBlockInput]}>
                                <TextInput onChangeText={text => setParams({ ...params, publisher: text })} mode='flat' label="Publisher" />
                            </View>
                            <View style={[styles.filterBlockInput]}>
                                <TextInput onChangeText={text => setParams({ ...params, issuetype: text })} mode='flat' label="Issue type" />
                            </View>
                        </View>
                        <View style={styles.filtersRow}>
                            <View style={[styles.filterBlockInput]}>
                                <TextInput onChangeText={text => setParams({ ...params, publicationDate: parseInt(text) })} keyboardType="numeric" mode='flat' label="Year" />
                            </View>
                            <View style={[styles.filterBlockInput]}>
                                <TextInput onChangeText={text => setParams({ ...params, keyWords: text })} mode='flat' label="Key words" placeholder="Ex: security, informatic, network" />
                            </View>
                        </View>
                        <Button onPress={handleSumitQuery}><MaterialIcons name="search" />Seach</Button>
                    </ScrollView>
                }</View>
        </View>
    )
}

const styles = StyleSheet.create(({
    filterBlockInput: {
        // maxWidth: Dimensions.get('window').width / 2 - 10,
        marginBottom: 3,
        marginHorizontal: 2,
        flex: 2
    },
    filtersRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 2
    }
}
))

export default SearchBlock;