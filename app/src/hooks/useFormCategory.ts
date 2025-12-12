import { useCategoryContext } from '@/app/src/contexts/CategoryContext'
import { useRouter } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import { CatParams } from "../modules/AdminModule/models/managementModels"
import { ICategory, IPictogram } from "../types/PyctogramTypes"

interface CatFormProps extends Omit<CatParams, 'pictograms' | 'category'> {
    pictograms: IPictogram[]
    category: ICategory
}

export const useFormCategory = (params?: CatFormProps) => {
    const router = useRouter()

    const { addCategory, updateCategory, categoriesSetter } = useCategoryContext()
    const { category: catToEdit } = params || {}

    const [name, setName] = useState('')
    const [color, setColor] = useState('#808080')
    const [imageUri, setImageUri] = useState('')

    const id = catToEdit?.id || `cat-${new Date().getTime().toString()}`

    const nameSetter = (name: string) => setName(name)
    const colorSetter = (color: string) => setColor(color)
    const imageUriSetter = (uri: string) => {
        setImageUri(uri)
    }

    const clearStates = () => {
        nameSetter('')
        colorSetter('')
        imageUriSetter('')
    }

    const handleSave = async () => {
        if (!name || !color || color.length < 4) {
            alert('El nombre y un color válido son obligatorios.')
            return
        }

        const categoryData: ICategory = {
            id,
            name: name.trim(),
            color: color.toUpperCase(),
            imageUri: imageUri || '',
        }

        if (catToEdit?.id) {
            await updateCategory(categoryData)
            alert(`Categoría "${name}" actualizada con éxito.`)
        } else {
            await addCategory(categoryData)
            alert(`Categoría "${name}" agregada con éxito.`)
        }

        await categoriesSetter()
        router.back()
        clearStates()
    }

    const catToUpdateSetter = useCallback(() => {
        if (catToEdit) {
            nameSetter(catToEdit.name)
            imageUriSetter(catToEdit?.imageUri || '')
            colorSetter(catToEdit.color)
        }
    }, [catToEdit])

    useEffect(() => {
        catToUpdateSetter()
    }, [])

    return {
        name,
        color,
        imageUri,
        nameSetter,
        colorSetter,
        imageUriSetter,
        handleSave,
    }
}
