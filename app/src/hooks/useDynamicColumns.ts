import { useWindowDimensions } from 'react-native'

interface ColumnConfig {
    portrait: number
    landscape: number
}

const defaultColumns: ColumnConfig = {
    portrait: 2,
    landscape: 3,
}

export const useDynamicColumns = (config: ColumnConfig = defaultColumns) => {
    const { width, height } = useWindowDimensions()

    const isLandscape = width > height

    const numColumns = isLandscape ? config.landscape : config.portrait

    return {
        isLandscape,
        numColumns,
    }
}