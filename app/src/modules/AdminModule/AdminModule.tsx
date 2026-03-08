import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BasicLoader } from '../../components/Loaders/BasicLoader'
import { useAdminPin } from '../../hooks/useAdminPin'
import { useDataHandler } from '../../hooks/useDataHandler'
import { BottomTabBar } from './components/BottomTabBar/BottomTabBar'
import { CategoryManagement } from './components/CategoryManagement'
import { ConfigurationManagement } from './components/ConfigurationManagement'
import { PictogramManagement } from './components/PictogramManagement'
import { PinEntry } from './components/PinEntry'

export type TabKey = 'pictograms' | 'categories' | 'configuration'

interface AdminModuleProps {
    initialVerified?: boolean
}

export const AdminModule = ({
    initialVerified = false,
}: AdminModuleProps) => {
    const { hasPin, isLoading: isLoadingPin } = useAdminPin()
    const [isVerified, setIsVerified] = useState(initialVerified)
    const [activeTab, setActiveTab] = useState<TabKey>('pictograms')
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
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {!hasPin && (
                    <View style={styles.warningBanner}>
                        <MaterialCommunityIcons name="alert-circle" size={24} color="#FF9800" />
                        <View style={styles.warningContent}>
                            <Text style={styles.warningTitle}>⚠️ Sin PIN configurado</Text>
                            <Text style={styles.warningDescription}>Tu módulo no está protegido. Configúralo en la pestaña de Configuración</Text>
                        </View>
                    </View>
                )}

                <View style={styles.content}>
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

                <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6EDED',
        flexDirection: 'column',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#07999921',
        paddingTop: 0,
        marginTop: 0,
    },
    content: {
        flex: 1,
    },
    warningBanner: {
        marginTop: -35,
        backgroundColor: '#FFF3E0',
        borderBottomWidth: 3,
        borderBottomColor: '#FF9800',
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    warningContent: {
        flex: 1,
    },
    warningTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF9800',
    },
    warningDescription: {
        fontSize: 13,
        color: '#E65100',
        marginTop: 2,
    },
})