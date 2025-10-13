
import { useCategoryForm } from '@/app/src/hooks/useCategoryForm';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLOR_PALETTE } from '../../utils/colorConst';
import { formStyles } from './styles';

const PictoIconSelector: React.FC<{ picto: any, isSelected: boolean, onSelect: () => void }> = ({ picto, isSelected, onSelect }) => (
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
);

export const CategoryForm: React.FC = () => {
    const {
        pictograms,
        name,
        isSaving,
        color,
        imageUri,
        nameSetter,
        colorSetter,
        imageUriSetter,
        handleSave,
    } = useCategoryForm();

    return (
        <ScrollView contentContainerStyle={formStyles.formContainer}>
            <Text style={formStyles.header}>Crear Nueva Categoría</Text>

            <Text style={formStyles.label}>Nombre de la Categoría</Text>
            <TextInput
                style={formStyles.input}
                value={name}
                onChangeText={nameSetter}
                placeholder="Ejemplo: Frutas"
            />

            <Text style={formStyles.label}>Color de la Tarjeta (Código Hexadecimal)</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.colorPaletteContainer}>
                {COLOR_PALETTE.map((paletteColor) => (
                    <TouchableOpacity
                        key={paletteColor}
                        onPress={() => colorSetter(paletteColor)}
                        style={[
                            styles.colorCircle,
                            { backgroundColor: paletteColor },
                            color === paletteColor && styles.selectedColorCircle,
                        ]}
                    />
                ))}
            </ScrollView>
            <View style={{ backgroundColor: color || '#FFFFFF' }} />
            <Text style={formStyles.label}>Seleccionar Ícono (Opcional)</Text>
            <Text style={formStyles.subText}>Elige un pictograma existente para representar esta categoría.</Text>
            <FlatList
                data={pictograms}
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
            <TouchableOpacity
                style={[formStyles.saveButton, isSaving && formStyles.saveButtonDisabled]}
                onPress={handleSave}
                disabled={isSaving || !name || color.length < 4}
            >
                <Text style={formStyles.saveButtonText}>
                    {isSaving ? 'GUARDANDO...' : 'GUARDAR CATEGORÍA'}
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    colorPaletteContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 15,
        paddingHorizontal: 5,
    },
    colorCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 5,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    selectedColorCircle: {
        borderWidth: 4,
        borderColor: '#333',
    },
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
