import { Stack, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { AdminModule } from './src/modules/AdminModule/AdminModule'
import { HeaderAdmin } from './src/modules/AdminModule/components/HeaderAdmin/HeaderAdmin'

export default function AdminScreen() {
  const router = useRouter()

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <HeaderAdmin title="Administrador" />,
        }}
      />
      <AdminModule />
    </>
  )
}

const styles = StyleSheet.create({
})

