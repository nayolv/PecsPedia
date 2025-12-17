import { PICTO_STORAGE_KEY } from '@/app/src/utils/consts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useState } from 'react'
import { IPictogram } from '../types/PyctogramTypes'

const initialPictograms: IPictogram[] = [
    { id: 'pic-1', text: 'Yo', imageUri: '', categoryIds: ['cat-2'], },
    { id: 'pic-2', text: 'Quiero', imageUri: '', categoryIds: ['cat-1'] },
    { id: 'pic-3', text: 'Comer', imageUri: '', categoryIds: ['cat-1'] },
    { id: 'pic-4', text: 'Feliz', imageUri: '', categoryIds: ['cat-3'] },
    { id: 'pic-5', text: 'Abrazar', imageUri: '', categoryIds: ['cat-1'] },
    { id: 'pic-6', text: 'Tú', imageUri: '', categoryIds: ['cat-2'] },
]

export const usePictograms = () => {
    const [pictograms, setPictograms] = useState<IPictogram[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [phrase, setPhrase] = useState<IPictogram[]>([])

    const pictogramsSetter = useCallback(async () => {
        try {
            const storedPictos = await AsyncStorage.getItem(PICTO_STORAGE_KEY)
            if (storedPictos) setPictograms(JSON.parse(storedPictos))
            else {
                setPictograms(initialPictograms)
                await AsyncStorage.setItem(PICTO_STORAGE_KEY, JSON.stringify(initialPictograms))
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const addPictogram = useCallback(async (newPicto: IPictogram) => {
        try {
            const stored = await AsyncStorage.getItem(PICTO_STORAGE_KEY)
            const currentList: IPictogram[] = stored ? JSON.parse(stored) : []

            const updatedList = [...currentList, newPicto]

            await AsyncStorage.setItem(PICTO_STORAGE_KEY, JSON.stringify(updatedList))
            setPictograms(updatedList)
        } catch (error) {
            console.error("Error al añadir y guardar pictograma:", error)
        }
    }, [])

    const updatePictogram = useCallback(async (updatedPictogram: IPictogram) => {
        try {
            const stored = await AsyncStorage.getItem(PICTO_STORAGE_KEY)
            const currentList: IPictogram[] = stored ? JSON.parse(stored) : []

            const updatedList = currentList.map(picto => picto.id === updatedPictogram.id ? updatedPictogram : picto)

            await AsyncStorage.setItem(PICTO_STORAGE_KEY, JSON.stringify(updatedList))
            setPictograms(updatedList)
        } catch (error) {
            console.error("Error al actualizar y guardar pictograma:", error)
        }
    }, [])

    const deletePictogram = useCallback(async (pictoId: string) => {
        try {
            const stored = await AsyncStorage.getItem(PICTO_STORAGE_KEY)
            const currentList: IPictogram[] = stored ? JSON.parse(stored) : []

            const updated = currentList.filter(cat => cat.id !== pictoId)

            await AsyncStorage.setItem(PICTO_STORAGE_KEY, JSON.stringify(updated))
            setPictograms(updated)
        } catch (error) {
            console.error('Error al eliminar pictograma:', error)
        }
    }, [])

    const addPictoToPhrase = useCallback((picto: IPictogram) => {
        setPhrase(prev => [...prev, picto])
    }, [])

    const clearPhrase = useCallback(() => setPhrase([]), [])

    return {
        isLoading,
        pictograms,
        phrase,
        addPictogram,
        updatePictogram,
        deletePictogram,
        addPictoToPhrase,
        clearPhrase,
        pictogramsSetter,
    }
}
