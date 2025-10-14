import { ICategory, IPictogram } from '@/app/src/types/PyctogramTypes'
import * as ImagePicker from 'expo-image-picker'
import { useCallback, useEffect, useState } from 'react'
import { PictoParams } from '../modules/AdminModule/components/PictogramManagement'
import { usePictograms } from './usePictograms'

interface PictoFormProps extends Omit<PictoParams, 'categories'> {
    categories: ICategory[]
}

export const usePictogramForm = (params?: PictoFormProps) => {
    const { addPictogram, updatePictogram, deletePictogram } = usePictograms()
    const { picto: pictoToEdit, categories } = params || {}
    const [text, setText] = useState('')
    const [imageUri, setImageUri] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(categories?.[0]?.id || '')

    const id = pictoToEdit?.id || `admin-${new Date().getTime().toString()}`

    const textSetter = (value: string) => setText(value)
    const categorySetter = (value: string) => setSelectedCategory(value)
    const imageSetter = (value: string) => setImageUri(value)

    const clearStates = () => {
        textSetter('')
        categorySetter('')
        imageSetter('')
    }

    const handleSave = async () => {
        if (!text || !selectedCategory) {
            alert('El texto y la categoría son obligatorios.')
            return
        }

        const pictoData: IPictogram = {
            id: id,
            text: text.trim(),
            imageUri: imageUri || 'https://via.placeholder.com/150',
            categoryIds: [selectedCategory],
            audioUri: undefined,
        }

        if (pictoToEdit?.id) {
            await updatePictogram(pictoData)
            alert(`Pictograma "${text}" actualizado con éxito.`)
        } else {
            await addPictogram(pictoData)
            alert(`Pictograma "${text}" agregado con éxito.`)
        }

        clearStates()
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (!result.canceled) {
            imageSetter(result.assets[0].uri)
        }
    }

    const editPictoSetter = useCallback(() => {
        if (pictoToEdit) {
            textSetter(pictoToEdit.text)
            imageSetter(pictoToEdit.imageUri)
        }
    }, [pictoToEdit])

    useEffect(() => {
        editPictoSetter()
    }, [])

    return {
        imageUri,
        text,
        textSetter,
        categorySetter,
        selectedCategory,
        handleSave,
        pickImage,
        deletePictogram,
    }
}
