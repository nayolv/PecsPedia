import { RoundedButton } from '@/app/src/components/Buttons/RoundedButton/RoundedButton'
import { SearchBar } from '@/app/src/components/Inputs/SearchBar/SearchBar'
import { PictogramList } from '@/app/src/components/Lists/PictogramList/PictogramList'
import { CustomPicker } from '@/app/src/components/Selectors/CustomPicker/CustomPicker'
import { StyleSheet, View } from 'react-native'
import { usePictogramManagement } from '../hooks/usePictogramManagement'
import { PictogramManagementProps, PictoParams } from '../models/managementModels'
import { fabBtnStyles, iconStyle } from '../utils/stylesUtils'
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
                <CustomPicker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                    items={pickerItems}
                    containerStyle={styles.pickerContainer}
                />
                <SearchBar
                    style={styles.searchBar}
                    placeholder="Buscar pictogramas..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <PictogramList
                filteredPictograms={filteredPictograms}
                renderItem={({ item }) => {
                    const category = categories.find(cat => cat.id === item.categoryIds[0])
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
                onPress={onCreatePicto}
                icon='plus'
                btnStyle={fabBtnStyles}
                iconStyle={iconStyle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    filtersContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    searchBar: {
        width: 300,
        marginBottom: 0
    },
    pickerContainer: {
        width: 250,
    },
})