import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BasicLoader } from '../../components/Loaders/BasicLoader'
import { Tab } from '../../components/Tabs/Tab'
import { useAdminPin } from '../../hooks/useAdminPin'
import { useDataHandler } from '../../hooks/useDataHandler'
import { useTabs } from '../../hooks/useTabs'
import { CategoryManagement } from './components/CategoryManagement'
import { ConfigurationManagement } from './components/ConfigurationManagement'
import { PictogramManagement } from './components/PictogramManagement'
import { PinEntry } from './components/PinEntry'
import { TabKey, tabs } from './utils/tabs'

interface AdminModuleProps {
    initialVerified?: boolean
}

export const AdminModule = ({ initialVerified = false }: AdminModuleProps) => {
    const { activeTab, handleActiveTab } = useTabs<TabKey>('pictograms')
    const { hasPin, isLoading: isLoadingPin } = useAdminPin()
    const [isVerified, setIsVerified] = useState(initialVerified)
    const {
        isLoading,
        pictograms,
        categories,
        deletePictogram,
        deleteCategory,
    } = useDataHandler()

    if (isLoading || isLoadingPin) return <BasicLoader />

    if (hasPin && !isVerified) {
        return <PinEntry onSuccess={() => setIsVerified(true)} />
    }

    return (
        <View style={styles.container}>
            {!hasPin && (
                <TouchableOpacity
                    style={styles.alertContainer}
                    onPress={() => handleActiveTab('configuration')}
                >
                    <Text style={styles.alertText}>
                        ⚠️ Tu panel de administración no está protegido. Haz clic aquí para configurar un PIN.
                    </Text>
                </TouchableOpacity>
            )}
            <View style={styles.tabContainer}>
                {tabs.map((tab, index) => (
                    <Tab
                        key={tab.key}
                        tabKey={tab.key}
                        label={tab.label}
                        activeTab={activeTab}
                        handleActiveTab={handleActiveTab}
                        isFirst={index === 0}
                        isLast={index === tabs.length - 1}
                    />
                ))}
            </View>
            {activeTab === 'pictograms' &&
                <PictogramManagement
                    pictograms={pictograms}
                    categories={categories}
                    onDelete={deletePictogram}
                />
            }
            {activeTab === 'categories' &&
                <CategoryManagement
                    categories={categories}
                    pictograms={pictograms}
                    onDelete={deleteCategory}
                />
            }
            {activeTab === 'configuration' &&
                <ConfigurationManagement />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6EDED',
    },
    alertContainer: {
        backgroundColor: '#FFF3CD',
        padding: 12,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFEeba',
        alignItems: 'center',
    },
    alertText: {
        color: '#856404',
        fontSize: 14,
        fontWeight: '600',
    },
    tabContainer: {
        flexDirection: 'row',
        height: 'auto',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
})