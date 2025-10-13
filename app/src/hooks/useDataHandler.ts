import { useEffect } from "react"
import { useCategories } from "./useCategories"
import { usePictograms } from "./usePictograms"
import { useStatus } from "./useStatus"

export const useDataHandler = () => {
    const { isLoading, loadingSetter } = useStatus()
    const pictograms = usePictograms()
    const categories = useCategories()

    const loadData = async () => {
        try {
            await pictograms.pictogramsSetter()
            await categories.categoriesSetter()
        } catch (error) {
            console.log('Error al cargar data: ', error)
        } finally {
            loadingSetter(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    return {
        isLoading,
        ...pictograms,
        ...categories
    }
}
