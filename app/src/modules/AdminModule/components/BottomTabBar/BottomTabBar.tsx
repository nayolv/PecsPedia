import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type TabKey = 'pictograms' | 'categories' | 'configuration'

interface TabItem {
    key: TabKey
    icon: string
    label: string
}

const TABS: TabItem[] = [
    {
        key: 'pictograms',
        icon: 'image-multiple',
        label: 'Pictos',
    },
    {
        key: 'categories',
        icon: 'folder-multiple',
        label: 'Cats',
    },
    {
        key: 'configuration',
        icon: 'cog',
        label: 'Config',
    },
]

interface BottomTabBarProps {
    activeTab: TabKey
    onTabChange: (tab: TabKey) => void
}

export const BottomTabBar = ({ activeTab, onTabChange }: BottomTabBarProps) => {
    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.wrapper, { paddingBottom: insets.bottom + 12 }]}>
            <View style={styles.container}>
                {TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab.key}
                        style={[
                            styles.tabItem,
                            activeTab === tab.key && styles.activeTabItem,
                        ]}
                        onPress={() => onTabChange(tab.key)}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons
                            name={tab.icon as any}
                            size={24}
                            color={activeTab === tab.key ? '#FFFFFF' : '#999999'}
                        />
                        <Text
                            style={[
                                styles.label,
                                activeTab === tab.key && styles.activeLabel,
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height: 0,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        height: 65,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    activeTabItem: {
        backgroundColor: '#6BAABB',
    },
    label: {
        fontSize: 10,
        color: '#999999',
        marginTop: 2,
        fontWeight: '500',
    },
    activeLabel: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
})
