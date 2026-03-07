import { usePictogramContext } from '@/app/src/contexts/PictogramContext'
import { ICategory, IPictogram } from '@/app/src/types/PyctogramTypes'
import { LOCAL_IMAGE_PREFIX } from '@/app/src/utils/imageResolver'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'

const TODOS_CATEGORY_ID = 'todos';

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

        const categoryIds = selectedCategory === TODOS_CATEGORY_ID
            ? [TODOS_CATEGORY_ID]
            : [TODOS_CATEGORY_ID, selectedCategory];

        const pictoData: IPictogram = {
            id: pictoToEdit?.id || id,
            text: text.trim(),
            imageUri: imageUri || `${LOCAL_IMAGE_PREFIX}default_img`,
            categoryIds: categoryIds,
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
            // Si el pictograma tiene "todos", mostrar "todos" como seleccionado
            // Si tiene múltiples categorías, mostrar la que no sea "todos"
            const nonTodosCategory = pictoToEdit?.categoryIds.find(id => id !== TODOS_CATEGORY_ID);
            categorySetter(nonTodosCategory || TODOS_CATEGORY_ID)
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
