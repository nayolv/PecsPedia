import { IPictogram } from '@/app/src/types/PyctogramTypes'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { useDataHandler } from './useDataHandler'

export const usePictogramForm = () => {
    const { pictograms, categories, addPictogram, isLoading } = useDataHandler()

    const [text, setText] = useState('')
    const [imageUri, setImageUri] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || '')

    const tempId = new Date().getTime().toString()

    const textSetter = (value: string) => setText(value)
    const categorySetter = (value: string) => setSelectedCategory(value)

    const handleSave = async () => {
        if (!text || !selectedCategory) {
            alert('El texto y la categoría son obligatorios.')
            return
        }

        const newPicto: IPictogram = {
            id: `admin-${tempId}`,
            text: text.trim(),
            imageUri: imageUri || 'https://via.placeholder.com/150',
            categoryIds: [selectedCategory],
            audioUri: undefined,
        }

        await addPictogram(newPicto)
        alert(`Pictograma "${text}" agregado con éxito.`)

        setText('')
        setImageUri('')
    }

    const pickImage = async () => {
        // Pedir permisos de la galería si es necesario (el módulo lo maneja automáticamente
        // en versiones recientes, pero es buena práctica tener esto en mente).

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Solo queremos imágenes
            allowsEditing: true, // Permitir que el usuario recorte la imagen
            aspect: [1, 1], // Aspecto cuadrado para pictogramas
            quality: 1,
        });

        if (!result.canceled) {
            // Guardamos el URI local de la imagen seleccionada
            setImageUri(result.assets[0].uri);
        }
    };

    return {
        imageUri,
        isLoading,
        text,
        pictograms,
        categories,
        textSetter,
        categorySetter,
        selectedCategory,
        handleSave,
        pickImage,
    }
}
