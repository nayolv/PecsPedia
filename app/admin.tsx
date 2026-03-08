import { Stack, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { AdminModule, menuItems, type TabKey } from './src/modules/AdminModule/AdminModule'
import { HeaderAdmin } from './src/modules/AdminModule/components/HeaderAdmin/HeaderAdmin'

export default function AdminScreen() {
  const { verified } = useLocalSearchParams<{ verified: string }>()
  const [activeTab, setActiveTab] = useState<TabKey>('pictograms')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSelectTab = (key: string) => {
    setActiveTab(key as TabKey)
  }

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <HeaderAdmin
              title="Administrador"
              menuItems={menuItems}
              activeItem={activeTab}
              onSelectItem={handleSelectTab}
              isMenuOpen={isMenuOpen}
              onMenuToggle={setIsMenuOpen}
            />
          ),
        }}
      />

      <AdminModule
        initialVerified={verified === 'true'}
        activeTab={activeTab}
        onMenuStateChange={setActiveTab}
      />
    </>
  )
}

const styles = StyleSheet.create({})

