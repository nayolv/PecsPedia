import { useDynamicColumns } from '@/app/src/hooks/useDynamicColumns'
import { useNavigate } from '@/app/src/hooks/useNavigate'
import { childRoutes } from '@/app/src/router/routes'
import { ICategory } from '@/app/src/types/PyctogramTypes'
import { useMemo, useState } from 'react'
import { CatParams } from '../models/managementModels'

export const useCategoryManagement = (categories: ICategory[]) => {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()
    const { numColumns } = useDynamicColumns()

    const filteredCategories = useMemo(() => categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [categories, searchQuery])

    const onUpdateCat = (params: CatParams) => {
        const inputParams: { [key: string]: any } = { ...params };
        navigate(childRoutes.createCategory, inputParams);
    }

    const onCreateCat = () => {
        navigate(childRoutes.createCategory, { categories: JSON.stringify(categories) })
    }

    return {
        searchQuery,
        setSearchQuery,
        filteredCategories,
        onUpdateCat,
        onCreateCat,
        numColumns
    }
}
