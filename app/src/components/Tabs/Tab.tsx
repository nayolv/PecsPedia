import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface TabsHeaderProps<T> {
    tabKey: string
    label: string
    activeTab: T
    handleActiveTab: (tab: any) => void
    isFirst?: boolean
    isLast?: boolean
}

export const Tab = <T,>({ tabKey, label, activeTab, handleActiveTab, isFirst, isLast }: TabsHeaderProps<T>) => {
    return (
        <TouchableOpacity
            style={[
                styles.tabButton,
                activeTab === tabKey && styles.activeTab,
                isFirst && styles.firstTab,
                isLast && styles.lastTab,
            ]}
            onPress={() => handleActiveTab(tabKey)}
        >
            <Text style={[styles.tabText, activeTab === tabKey && styles.activeText]}>
                {label?.toUpperCase()}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#CCC',
        minWidth: 190,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    firstTab: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    lastTab: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    activeTab: {
        backgroundColor: '#6BAABB',
    },
    tabText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#555',
    },
    activeText: {
        color: '#FFFFFF',
    },
})