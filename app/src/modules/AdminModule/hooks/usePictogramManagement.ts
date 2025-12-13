import { useDynamicColumns } from '@/app/src/hooks/useDynamicColumns'
import { useNavigate } from '@/app/src/hooks/useNavigate'
import { childRoutes } from '@/app/src/router/routes'
import { ICategory, IPictogram } from '@/app/src/types/PyctogramTypes'
import { useMemo, useState } from 'react'
import { PictoParams } from '../models/managementModels'

export const usePictogramManagement = (pictograms: IPictogram[], categories: ICategory[]) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const navigate = useNavigate()
    const { numColumns } = useDynamicColumns()

    const filteredPictograms = useMemo(() => pictograms.filter(picto => {
        const matchesSearch = picto.text.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || picto.categoryIds.includes(selectedCategory)
        return matchesSearch && matchesCategory
    }), [pictograms, searchQuery, selectedCategory])

    const onUpdatePicto = (params: PictoParams) => {
        const inputParams: { [key: string]: any } = { ...params };
        navigate(childRoutes.createPicto, inputParams);
    }

    const onCreatePicto = () => {
        navigate(childRoutes.createPicto, { categories: JSON.stringify(categories) })
    }

    const pickerItems = [
        { label: "Todas las categorías", value: "all" },
        ...categories.map(cat => ({ label: cat.name, value: cat.id }))
    ]

    return {
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        filteredPictograms,
        onUpdatePicto,
        onCreatePicto,
        pickerItems,
        numColumns
    }
}
