import { SearchBar } from '@/app/src/components/Inputs/SearchBar/SearchBar'
import { useDynamicColumns } from '@/app/src/hooks/useDynamicColumns'
import { ICategory, IPictogram } from '@/app/src/types/PyctogramTypes'
import { Picker } from '@react-native-picker/picker'
import React, { useMemo, useState } from 'react'
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native'

interface PictogramListProps {
    pictograms: IPictogram[]
    categories: ICategory[]
    renderItem: ListRenderItem<IPictogram>
    headerComponent?: React.ReactNode
}

export const PictogramList = ({ pictograms, categories, renderItem, headerComponent }: PictogramListProps) => {
    const { numColumns } = useDynamicColumns()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    const filteredPictograms = useMemo(() => pictograms.filter(picto => {
        const matchesSearch = picto.text.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || picto.categoryIds.includes(selectedCategory)
        return matchesSearch && matchesCategory
    }), [pictograms, searchQuery, selectedCategory])

    return (
        <View style={styles.container}>
            <View style={styles.filtersContainer}>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Todas las categorías" value="all" />
                        {categories.map(cat => (
                            <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                        ))}
                    </Picker>
                </View>
                <SearchBar
                    style={styles.searchBar}
                    placeholder="Buscar pictogramas..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
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
    filtersContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        width: 250,
        height: 55,
        justifyContent: 'center',
    },
    picker: {
        width: '100%',
        height: '100%',
    },
    searchBar: {
        width: 300,
        marginBottom: 0
    },
    listContent: {
        paddingBottom: 20,
    }
})
