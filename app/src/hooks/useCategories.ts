import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { ICategory } from '../types/PyctogramTypes';
import { CATEGORY_STORAGE_KEY } from '../utils/consts';

const initialCategories: ICategory[] = [
    { id: 'cat-1', name: 'Acciones', color: '#FFDAB9', imageUri: 'https://via.placeholder.com/50/FFDAB9?text=Acc' },
    { id: 'cat-2', name: 'Personas', color: '#ADD8E6', imageUri: 'https://via.placeholder.com/50/ADD8E6?text=Per' },
    { id: 'cat-3', name: 'Sentimientos', color: '#98FB98', imageUri: 'https://via.placeholder.com/50/98FB98?text=Sen' },
];

export const useCategories = () => {
    const [categories, setCategories] = useState<ICategory[]>([])

    const addCategory = async (newCategory: ICategory) => {
        setCategories(prev => {
            const updated = [...prev, newCategory]
            AsyncStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(updated))
            return updated
        })
    }

    const updateCategory = async (updatedCategory: ICategory) => {
        setCategories(prev => {
            const updated = prev.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat)
            AsyncStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(updated))
            return updated
        })
    }

    const deleteCategory = async (categoryId: string) => {
        setCategories(prev => {
            const updated = prev.filter(cat => cat.id !== categoryId)
            AsyncStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(updated))
            return updated
        })
    }

    const categoriesSetter = async () => {
        const storedCategories = await AsyncStorage.getItem(CATEGORY_STORAGE_KEY)
        if (storedCategories) setCategories(JSON.parse(storedCategories))
        else {
            setCategories(initialCategories)
            await AsyncStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(initialCategories))
        }
    }
    return {
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        categoriesSetter
    }
}
