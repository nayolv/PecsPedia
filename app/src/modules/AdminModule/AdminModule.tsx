import { StyleSheet, View } from 'react-native'
import { BasicLoader } from '../../components/Loaders/BasicLoader'
import { Tab } from '../../components/Tabs/Tab'
import { useDataHandler } from '../../hooks/useDataHandler'
import { useTabs } from '../../hooks/useTabs'
import { CategoryManagement } from './components/CategoryManagement'
import { PictogramManagement } from './components/PictogramManagement'
import { TabKey, tabs } from './utils/tabs'

export const AdminModule: React.FC = () => {
    const { activeTab, handleActiveTab } = useTabs<TabKey>('pictograms')
    const {
        isLoading,
        pictograms,
        categories,
        deletePictogram,
        deleteCategory,
    } = useDataHandler()

    if (isLoading) return <BasicLoader />

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                {tabs.map((tab) => (
                    <Tab
                        key={tab.key}
                        tabKey={tab.key}
                        label={tab.label}
                        activeTab={activeTab}
                        handleActiveTab={handleActiveTab}
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3F1FE',
    },
    tabContainer: {
        flexDirection: 'row',
        height: 'auto',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#CDDDEA'
    },
})