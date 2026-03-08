import { RoundedButton } from '@/app/src/components/Buttons/RoundedButton/RoundedButton'
import { CollapsibleSearchBar } from '@/app/src/components/Inputs/SearchBar/CollapsibleSearchBar'
import { PictogramList } from '@/app/src/components/Lists/PictogramList/PictogramList'
import { CollapsibleCategoryPicker } from '@/app/src/components/Selectors/CustomPicker/CollapsibleCategoryPicker'
import { StyleSheet, Text, View } from 'react-native'
import { usePictogramManagement } from '../hooks/usePictogramManagement'
import { PictogramManagementProps, PictoParams } from '../models/managementModels'
import { fabBtnStyles } from '../utils/stylesUtils'
import { ListItem } from './Lists/ListItem'

export const PictogramManagement = ({ pictograms, categories, onDelete }: PictogramManagementProps) => {
    const {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        filteredPictograms,
        onUpdatePicto,
        onCreatePicto,
        pickerItems,
        numColumns
    } = usePictogramManagement(pictograms, categories)

    return (
        <View style={styles.container}>
            <View style={styles.filtersContainer}>
                <Text>Pictogramas</Text>
                <CollapsibleCategoryPicker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                    items={pickerItems}
                />
                <CollapsibleSearchBar
                    style={styles.searchBar}
                    placeholder="Buscar pictogramas..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <PictogramList
                filteredPictograms={filteredPictograms}
                renderItem={({ item }) => {
                    const category = categories.find(cat => cat.id === item.categoryIds?.find(id => id === cat.id))
                    const params: PictoParams = {
                        picto: JSON.stringify(item),
                        categories: JSON.stringify(categories),
                        pictograms: JSON.stringify(pictograms),
                    }

                    return <ListItem
                        key={item.id}
                        text={item.text}
                        subText={category?.name || ''}
                        color={category?.color}
                        imageUri={item.imageUri}
                        columns={numColumns}
                        onUpdate={() => onUpdatePicto(params)}
                        onDelete={() => onDelete(item.id)}
                    />
                }}
            />
            <RoundedButton
                icon='plus'
                style={fabBtnStyles}
                onPress={onCreatePicto}
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
        gap: 10,
        minHeight: 60,
    },
    searchBar: {
        marginBottom: 0
    },
})