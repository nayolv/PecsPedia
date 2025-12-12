import { useCategoryContext } from '@/app/src/contexts/CategoryContext'
import { usePictogramContext } from '@/app/src/contexts/PictogramContext'
import { useEffect } from "react"

export const useDataHandler = () => {
    const pictogramsHook = usePictogramContext()
    const categoriesHook = useCategoryContext()
    const isLoading = pictogramsHook.isLoading || categoriesHook.isLoading;

    useEffect(() => {
        pictogramsHook.pictogramsSetter()
        categoriesHook.categoriesSetter()
    }, [pictogramsHook.pictograms, categoriesHook.categories, isLoading])

    return {
        ...pictogramsHook,
        ...categoriesHook,
        isLoading,
    }
}
