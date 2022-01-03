import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import DocItem from '../components/DocItem'
import { deleteDocAction } from '../store/docs/actions'
import { docsSelector } from '../store/docs/selectors'

const SavedDocuments = ({navigation}: {navigation: any}) => {
  const docs = useSelector(docsSelector);

  const dispatch = useDispatch()
  const onDelete = useCallback(
    (doc) => {
      dispatch(deleteDocAction(doc))
    },
    [dispatch],
  )
  return (
    <View>
      <FlatList
        data={docs}
        renderItem={({item}) => (
          <DocItem
            doc={item.data}
            onDelete={()=>onDelete(item.data)}
            onPress={() => {
              navigation.navigate(
                'SearchStack' as never,
                {
                  screen: 'Details',
                  params: {
                    document: {
                      title: (item.data as any).title,
                      publicationDate: (item.data as any).publicationDate,
                      contentType: (item.data as any).contentType,
                      publisher: (item.data as any).publisher,
                      abstract: (item.data as any).abstract,
                      doi: (item.data as any).doi,
                      openaccess: (item.data as any).openaccess,
                      authors: (item.data as any).creators,
                    } as Document,
                  },
                } as never,
              );
            }}
          />
        )}
      />
    </View>
  );
};

export default SavedDocuments

export const DOCS_KEY = 'docs';

const styles = StyleSheet.create({})
