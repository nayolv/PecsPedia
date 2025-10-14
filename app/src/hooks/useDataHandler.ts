import { useCategories } from "./useCategories"
import { usePictograms } from "./usePictograms"
import { useStatus } from "./useStatus"

export const useDataHandler = () => {
    const { isLoading, loadingSetter } = useStatus()
    const pictograms = usePictograms()
    const categories = useCategories()

    const dataSetter = async () => {
        await pictograms.pictogramsSetter()
        await categories.categoriesSetter()
    }

    const loadData = async () => {
        try {
            await dataSetter()
        } catch (error) {
            console.error('Error al cargar data: ', error)
        } finally {
            loadingSetter(false)
        }
    }


    return {
        isLoading,
        loadData,
        ...pictograms,
        ...categories
    }
}
