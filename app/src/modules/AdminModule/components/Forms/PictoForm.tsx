import { usePictogramForm } from '@/app/src/hooks/usePictogramForm'
import { Picker } from '@react-native-picker/picker'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { formStyles } from './styles'

export const PictoForm = ({ }) => {
  const {
    imageUri,
    categories,
    text,
    textSetter,
    categorySetter,
    handleSave,
    selectedCategory,
    pickImage,
  } = usePictogramForm()

  return (
    <View style={formStyles.formContainer}>
      <Text style={formStyles.header}>Crear Nuevo Pictograma</Text>
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
          {categories.map(cat => (
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

