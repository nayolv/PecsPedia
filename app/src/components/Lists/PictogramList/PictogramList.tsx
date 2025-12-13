import { useDynamicColumns } from '@/app/src/hooks/useDynamicColumns'
import { IPictogram } from '@/app/src/types/PyctogramTypes'
import React from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'

interface PictogramListProps {
    filteredPictograms: IPictogram[]
    renderItem: ListRenderItem<IPictogram>
    headerComponent?: React.ReactNode
}

export const PictogramList = ({ filteredPictograms, renderItem, headerComponent }: PictogramListProps) => {
    const { numColumns } = useDynamicColumns()

    return (
        <View style={styles.container}>
            {headerComponent}
            <FlatList
                key={numColumns}
                data={filteredPictograms}
                keyExtractor={(picto) => `${picto.id}`}
                numColumns={numColumns}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 20,
    }
})
