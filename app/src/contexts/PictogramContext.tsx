import { usePictograms } from '@/app/src/hooks/usePictograms'
import { IPictogram } from '@/app/src/types/PyctogramTypes'
import React, { createContext, ReactNode, useContext, useMemo } from 'react'

interface PictogramContextShape {
    isLoading: boolean
    pictograms: IPictogram[]
    phrase: IPictogram[]
    addPictogram: (p: IPictogram) => Promise<void>
    updatePictogram: (p: IPictogram) => Promise<void>
    deletePictogram: (id: string) => Promise<void>
    addPictoToPhrase: (p: IPictogram) => void
    clearPhrase: () => void
    pictogramsSetter: () => Promise<void>
}

const PictogramContext = createContext<PictogramContextShape | undefined>(undefined)

export const PictogramProvider = ({ children }: { children: ReactNode }) => {
    const hook = usePictograms()

    const value = useMemo(() => ({
        isLoading: hook.isLoading,
        pictograms: hook.pictograms,
        phrase: hook.phrase,
        addPictogram: hook.addPictogram,
        updatePictogram: hook.updatePictogram,
        deletePictogram: hook.deletePictogram,
        addPictoToPhrase: hook.addPictoToPhrase,
        clearPhrase: hook.clearPhrase,
        pictogramsSetter: hook.pictogramsSetter,
    }), [
        hook.isLoading,
        hook.pictograms,
        hook.phrase,
        hook.addPictogram,
        hook.updatePictogram,
        hook.deletePictogram,
        hook.addPictoToPhrase,
        hook.clearPhrase,
        hook.pictogramsSetter
    ])

    return (
        <PictogramContext.Provider value={value}>
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
