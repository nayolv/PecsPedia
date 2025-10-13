import { useRouter } from "expo-router"
import { useState } from "react"
import { ICategory } from "../types/PyctogramTypes"
import { useCategories } from "./useCategories"
import { usePictograms } from "./usePictograms"
import { useStatus } from "./useStatus"

export const useCategoryForm = () => {
    const [name, setName] = useState('')
    const [color, setColor] = useState('#808080')
    const [imageUri, setImageUri] = useState('')

    const { isSaving, savingSetter } = useStatus()
    const { pictograms } = usePictograms()
    const { addCategory } = useCategories()

    const router = useRouter();

    const nameSetter = (name: string) => setName(name)
    const colorSetter = (color: string) => setColor(color)
    const imageUriSetter = (uri: string) => setImageUri(uri)

    const handleSave = async () => {
        if (!name || !color || color.length < 4) {
            alert('El nombre y un color válido son obligatorios.');
            return;
        }

        savingSetter(true);

        const newCategory: ICategory = {
            id: `cat-${Date.now()}`,
            name: name.trim(),
            color: color.toUpperCase(),
            imageUri: imageUri || '',
        };

        try {
            await addCategory(newCategory);
            alert(`Categoría "${name}" creada con éxito.`);

            router.back();

        } catch (error) {
            console.error('Error al guardar categoría:', error);
            alert('Error al guardar la categoría. Revisa la consola.');
        } finally {
            savingSetter(false);
        }
    };

    return {
        pictograms,
        name,
        color,
        imageUri,
        isSaving,
        nameSetter,
        colorSetter,
        imageUriSetter,
        handleSave,
    }
}
