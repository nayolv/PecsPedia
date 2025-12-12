import { useCategoryContext } from '@/app/src/contexts/CategoryContext'
import { usePictogramContext } from '@/app/src/contexts/PictogramContext'
import { useEffect } from "react"

export const useDataHandler = () => {
    const pictogramsHook = usePictogramContext()
    const categoriesHook = useCategoryContext()
    const isLoading = pictogramsHook.isLoading || categoriesHook.isLoading;

    const loadData = async () => {
        await Promise.all([
            pictogramsHook.pictogramsSetter(),
            categoriesHook.categoriesSetter()
        ])
    }

    useEffect(() => {
        loadData()
    }, [])

    return {
        ...pictogramsHook,
        ...categoriesHook,
        isLoading,
        loadData
    }
}
