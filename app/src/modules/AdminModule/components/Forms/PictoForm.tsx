import { useFormPictogram } from '@/app/src/hooks/useFormPictogram'
import { ICategory, IPictogram } from '@/app/src/types/PyctogramTypes'
import { Picker } from '@react-native-picker/picker'
import { useLocalSearchParams } from 'expo-router'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { PictoParams } from '../../models/managementModels'
import { formStyles } from './styles'

export const PictoForm = ({ }) => {
  const params = useLocalSearchParams() as unknown as PictoParams || {}
  const { picto, categories, pictograms } = params || {}
  const pictoToEdit = picto ? JSON.parse(picto) : null
  const title = pictoToEdit?.id ? 'Editar Pictograma' : 'Crear Nuevo Pictograma'
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
      <Text style={formStyles.header}>{title}</Text>
      <Text style={formStyles.label}>Texto a mostrar</Text>
      <TextInput
        style={formStyles.input}
        value={text}
        onChangeText={textSetter}
        placeholder="Ejemplo: ¡Quiero!"
      />
      <Text style={formStyles.label}>Categoría</Text>
      <View style={formStyles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => categorySetter(itemValue)}
          style={formStyles.picker}
        >
          {parsedCategories?.map(cat => (
            <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
          ))}
        </Picker>
      </View>
      <Text style={formStyles.label}>Imagen/Ícono</Text>
      <View style={formStyles.imageUploadContainer}>
        <TouchableOpacity
          style={formStyles.imagePlaceholder}
          onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={formStyles.previewImage} />
          ) : (
            <Text style={formStyles.imageText}>Click para Subir Imagen</Text>
          )}
        </TouchableOpacity>
      </View>
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

