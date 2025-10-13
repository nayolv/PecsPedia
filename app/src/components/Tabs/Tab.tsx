import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface TabsHeaderProps<T> {
    tabKey: string
    label: string
    activeTab: T
    handleActiveTab: (tab: any) => void
}

export const Tab = <T,>({ tabKey, label, activeTab, handleActiveTab }: TabsHeaderProps<T>) => {
    return (
        <TouchableOpacity
            style={[styles.tabButton, activeTab === tabKey && styles.activeTab]}
            onPress={() => handleActiveTab(tabKey)}
        >
            <Text style={[styles.tabText, activeTab === tabKey && styles.activeText]}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        width: 190,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 5,
    },
    activeTab: {
        backgroundColor: '#3BB8B0',
    },
    tabText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
    },
    activeText: {
        color: '#FFFFFF',
    },
})