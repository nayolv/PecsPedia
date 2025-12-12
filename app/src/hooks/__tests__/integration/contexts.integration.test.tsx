import { CategoryProvider, useCategoryContext } from '@/app/src/contexts/CategoryContext'
import { PictogramProvider, usePictogramContext } from '@/app/src/contexts/PictogramContext'
import { ICategory, IPictogram } from '@/app/src/types/PyctogramTypes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { act, renderHook } from '@testing-library/react-hooks'
import React from 'react'

jest.mock('@react-native-async-storage/async-storage')

const wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <CategoryProvider>
        <PictogramProvider>{children}</PictogramProvider>
    </CategoryProvider>
)

test('Providers: add/update/delete pictogram and category persist correctly', async () => {
    // Setup AsyncStorage mocks: initial empty arrays for both keys
    ; (AsyncStorage.getItem as jest.Mock).mockImplementation((key: string) => {
        if (key.includes('Pictograms')) return Promise.resolve(JSON.stringify([]))
        if (key.includes('Categories')) return Promise.resolve(JSON.stringify([]))
        return Promise.resolve(null)
    })

    const { result } = renderHook(() => ({
        pictograms: usePictogramContext(),
        categories: useCategoryContext(),
    }), { wrapper })

    const pictogramResult = { current: result.current.pictograms }
    const categoryResult = { current: result.current.categories }

    const newCat: ICategory = { id: 'cat-x', name: 'TestCat', color: '#FFF', imageUri: '' }
    const newPicto: IPictogram = { id: 'pic-x', text: 'Hello', imageUri: '', categoryIds: ['cat-x'] }

    await act(async () => {
        await categoryResult.current.addCategory(newCat)
    })

    expect(categoryResult.current.categories).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'cat-x' })]))
    expect(AsyncStorage.setItem).toHaveBeenCalled()

    await act(async () => {
        await pictogramResult.current.addPictogram(newPicto)
    })

    expect(pictogramResult.current.pictograms).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'pic-x' })]))

    // Update pictogram
    const updatedPicto = { ...newPicto, text: 'Hello Updated' }
    await act(async () => {
        await pictogramResult.current.updatePictogram(updatedPicto)
    })

    expect(pictogramResult.current.pictograms.find(p => p.id === 'pic-x')?.text).toBe('Hello Updated')

    // Delete pictogram
    await act(async () => {
        await pictogramResult.current.deletePictogram('pic-x')
    })

    expect(pictogramResult.current.pictograms.find(p => p.id === 'pic-x')).toBeUndefined()
})
