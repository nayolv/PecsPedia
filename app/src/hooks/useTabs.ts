import { useState } from 'react'



export const useTabs = <T,>(initialTab: T) => {
    const [activeTab, setActiveTab] = useState<T>(initialTab)

    const handleActiveTab = (tab: any) => {
        setActiveTab(tab)
    }

    return {
        activeTab,
        handleActiveTab,
    }
}
