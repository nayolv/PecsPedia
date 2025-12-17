import { usePictogramContext } from '@/app/src/contexts/PictogramContext'
import { ICategory, IPictogram } from '@/app/src/types/PyctogramTypes'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'

interface PictoFormProps {
    categories: ICategory[]
    picto: IPictogram
    pictograms: IPictogram[]
}

export const useFormPictogram = (params?: PictoFormProps) => {
    const router = useRouter()

    const { addPictogram, updatePictogram, deletePictogram, pictogramsSetter } = usePictogramContext()
    const { picto: pictoToEdit, categories } = params || {}

    const [text, setText] = useState('')
    const [imageUri, setImageUri] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(categories?.[0]?.id || '')


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

        const id = pictoToEdit?.id || `picto-${new Date().getTime().toString()}`

        const pictoData: IPictogram = {
            id: pictoToEdit?.id || id,
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

        router.back()
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

    const pictoToUpdateSetter = useCallback(() => {
        if (pictoToEdit) {
            textSetter(pictoToEdit?.text)
            categorySetter(pictoToEdit?.categoryIds[0])
            imageSetter(pictoToEdit?.imageUri)
        }
    }, [pictoToEdit])

    useEffect(() => {
        pictoToUpdateSetter()
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
