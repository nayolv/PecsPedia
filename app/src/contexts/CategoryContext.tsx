import { useCategories } from '@/app/src/hooks/useCategories'
import { ICategory } from '@/app/src/types/PyctogramTypes'
import React, { createContext, ReactNode, useContext } from 'react'

interface CategoryContextShape {
    isLoading: boolean
    categories: ICategory[]
    addCategory: (c: ICategory) => Promise<void>
    updateCategory: (c: ICategory) => Promise<void>
    deleteCategory: (id: string) => Promise<void>
    categoriesSetter: () => Promise<void>
}

const CategoryContext = createContext<CategoryContextShape | undefined>(undefined)

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
    const hook = useCategories()

    return (
        <CategoryContext.Provider value={{
            isLoading: hook.isLoading,
            categories: hook.categories,
            addCategory: hook.addCategory,
            updateCategory: hook.updateCategory,
            deleteCategory: hook.deleteCategory,
            categoriesSetter: hook.categoriesSetter,
        }}>
            {children}
        </CategoryContext.Provider>
    )
}

export const useCategoryContext = () => {
    const ctx = useContext(CategoryContext)
    if (!ctx) throw new Error('useCategoryContext must be used within a CategoryProvider')
    return ctx
}

export default CategoryContext
