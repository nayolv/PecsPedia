import { useState } from "react";

export const useStatus = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false);

    const loadingSetter = (status: boolean) => setIsLoading(status)
    const savingSetter = (status: boolean) => setIsSaving(status)


    return {
        isLoading,
        isSaving,
        savingSetter,
        loadingSetter
    }
}
