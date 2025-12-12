
import { ColorSelector } from '@/app/src/components/Selectors/ColorSelector/ColorSelector'
import { useFormCategory } from '@/app/src/hooks/useFormCategory'
import { IPictogram } from '@/app/src/types/PyctogramTypes'
import { useLocalSearchParams } from 'expo-router'
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { CatParams } from '../../models/managementModels'
import { formStyles } from './styles'

interface PictoSelectorProps { picto: any, isSelected: boolean, onSelect: () => void }

const PictoIconSelector = ({ picto, isSelected, onSelect }: PictoSelectorProps) => (
    <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem, { borderColor: picto.categoryIds ? '#3DB9C5' : '#CCC' }]}
        onPress={onSelect}
    >
        <Image
            source={{ uri: picto.imageUri || 'https://via.placeholder.com/150' }}
            style={styles.image}
        />
        <Text style={styles.text} numberOfLines={1}>{picto.text}</Text>
    </TouchableOpacity>
)

export const CategoryForm: React.FC = () => {
    const params = useLocalSearchParams() as unknown as CatParams || {}
    const { category, pictograms } = params || {}
    const parsedCat = category ? JSON.parse(category) : {}
    const title = parsedCat?.id ? 'Editar Categoría' : 'Crear Nueva Categoría'
    const parsedPictograms: IPictogram[] = pictograms ? JSON.parse(pictograms) : []

    const {
        name,
        color,
        imageUri,
        nameSetter,
        colorSetter,
        imageUriSetter,
        handleSave,
    } = useFormCategory({ ...params, category: parsedCat, pictograms: parsedPictograms })

    return (
        <ScrollView contentContainerStyle={formStyles.formContainer}>
            <Text style={formStyles.header}>{title}</Text>

            <Text style={formStyles.label}>Nombre de la Categoría</Text>
            <TextInput
                style={formStyles.input}
                value={name}
                onChangeText={nameSetter}
                placeholder="Ejemplo: Frutas"
            />
            <Text style={formStyles.label}>Color del borde</Text>
            <ColorSelector selectedColor={color} onPress={colorSetter} />
            {parsedPictograms?.length ?
                <>
                    <Text style={formStyles.label}>Seleccionar Ícono (Opcional)</Text>
                    <Text style={formStyles.subText}>Elige un pictograma existente para representar esta categoría.</Text>
                    <FlatList
                        data={parsedPictograms}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <PictoIconSelector
                                picto={item}
                                isSelected={item.imageUri === imageUri}
                                onSelect={() => imageUriSetter(item.imageUri)}
                            />
                        )}
                        contentContainerStyle={formStyles.iconList}
                    />
                </>
                : null
            }
            <TouchableOpacity
                style={[formStyles.saveButton]}
                onPress={handleSave}
                disabled={!name || color?.length < 4}
            >
                <Text style={formStyles.saveButtonText}>
                    GUARDAR CATEGORÍA
                </Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginHorizontal: 5,
    },
    selectedItem: {
        borderWidth: 2,
        borderColor: '#3DB9C5',
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
    },

})
