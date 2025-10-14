import { PICTO_STORAGE_KEY } from '@/app/src/utils/consts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { IPhraseItem, IPictogram } from '../types/PyctogramTypes'

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
    const [phrase, setPhrase] = useState<IPhraseItem[]>([])

    const pictogramsSetter = async () => {
        const storedPictos = await AsyncStorage.getItem(PICTO_STORAGE_KEY)
        if (storedPictos) setPictograms(JSON.parse(storedPictos))
        else {
            setPictograms(initialPictograms)
            await AsyncStorage.setItem(PICTO_STORAGE_KEY, JSON.stringify(initialPictograms))
        }
    }

    const addPictogram = async (newPicto: IPictogram) => {
        const updatedPictos = [...pictograms, newPicto]
        setPictograms(updatedPictos)
        await AsyncStorage.setItem(PICTO_STORAGE_KEY, JSON.stringify(updatedPictos))
    }

    const updatePictogram = async (updatedPictogram: IPictogram) => {
        setPictograms(prev => {
            const updated = prev.map(picto => picto.id === updatedPictogram.id ? updatedPictogram : picto)
            AsyncStorage.setItem(PICTO_STORAGE_KEY, JSON.stringify(updated))
            return updated
        })
    }

    const deletePictogram = async (pictoId: string) => {
        setPictograms(prev => {
            const updated = prev.filter(cat => cat.id !== pictoId)
            AsyncStorage.setItem(PICTO_STORAGE_KEY, JSON.stringify(updated))
            return updated
        })
    }

    const addPictoToPhrase = (picto: IPictogram) => {
        const updatedPictos = [...phrase, picto]
        setPhrase(updatedPictos)
    }

    const clearPhrase = () => setPhrase([])

    return {
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
