import { usePictograms } from '@/app/src/hooks/usePictograms'
import { IPictogram } from '@/app/src/types/PyctogramTypes'
import React, { createContext, ReactNode, useContext } from 'react'

interface PictogramContextShape {
    isLoading: boolean
    pictograms: IPictogram[]
    addPictogram: (p: IPictogram) => Promise<void>
    updatePictogram: (p: IPictogram) => Promise<void>
    deletePictogram: (id: string) => Promise<void>
    pictogramsSetter: () => Promise<void>
}

const PictogramContext = createContext<PictogramContextShape | undefined>(undefined)

export const PictogramProvider = ({ children }: { children: ReactNode }) => {
    const hook = usePictograms()

    return (
        <PictogramContext.Provider value={{
            isLoading: hook.isLoading,
            pictograms: hook.pictograms,
            addPictogram: hook.addPictogram,
            updatePictogram: hook.updatePictogram,
            deletePictogram: hook.deletePictogram,
            pictogramsSetter: hook.pictogramsSetter,
        }}>
            {children}
        </PictogramContext.Provider>
    )
}

export const usePictogramContext = () => {
    const ctx = useContext(PictogramContext)
    if (!ctx) throw new Error('usePictogramContext must be used within a PictogramProvider')
    return ctx
}

export default PictogramContext
