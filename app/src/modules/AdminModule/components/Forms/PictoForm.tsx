import { CustomPicker } from '@/app/src/components/Selectors/CustomPicker/CustomPicker'
import { useFormPictogram } from '@/app/src/hooks/useFormPictogram'
import { ICategory, IPictogram } from '@/app/src/types/PyctogramTypes'
import { useLocalSearchParams } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { PictoParams } from '../../models/managementModels'
import { ImageUploader } from './ImageUploader'
import { formStyles } from './styles'

export const PictoForm = ({ }) => {
  const params = useLocalSearchParams() as unknown as PictoParams || {}
  const { picto, categories, pictograms } = params || {}
  const pictoToEdit = picto ? JSON.parse(picto) : null
  const parsedCategories: ICategory[] = categories ? JSON.parse(categories) : []
  const parsedPictograms: IPictogram[] = pictograms ? JSON.parse(pictograms) : []

  const {
    imageUri,
    text,
    textSetter,
    categorySetter,
    handleSave,
    selectedCategory,
    pickImage,
  } = useFormPictogram({
    ...params,
    categories: parsedCategories,
    picto: pictoToEdit,
    pictograms: parsedPictograms
  })

  return (
    <View style={formStyles.formContainer}>
      <Text style={formStyles.label}>Texto a mostrar</Text>
      <TextInput
        style={formStyles.input}
        value={text}
        onChangeText={textSetter}
        placeholder="Ejemplo: ¡Quiero!"
      />
      <Text style={formStyles.label}>Categoría</Text>
      <CustomPicker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => categorySetter(itemValue)}
        items={parsedCategories?.map(cat => ({ label: cat.name, value: cat.id })) || []}
        containerStyle={formStyles.pickerContainer}
      />
      <Text style={formStyles.label}>Imagen/Ícono</Text>
      <ImageUploader imageUri={imageUri} onPress={pickImage} />
      <TouchableOpacity
        style={formStyles.saveButton}
        onPress={handleSave}
        disabled={!text || !selectedCategory}
      >
        <Text style={formStyles.saveButtonText}>GUARDAR PICTOGRAMA</Text>
      </TouchableOpacity>
    </View>
  )
}

