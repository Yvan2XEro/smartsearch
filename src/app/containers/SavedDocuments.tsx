import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { docsSelector } from '../store/docs/selectors'

const SavedDocuments = () => {
    
    const docs = useSelector(docsSelector)
    console.log("uuuuuuuuuu",docs.length)
    return (
      <View>
        <FlatList
          data={docs}
          renderItem={({item}) => (
            <Text>
              {item.data.title.length > 48
                ? item.data.title.substr(0, 45)
                : item.data.title}
            </Text>
          )}
        />
      </View>
    );
}

export default SavedDocuments

export const DOCS_KEY = 'docs';

const styles = StyleSheet.create({})
