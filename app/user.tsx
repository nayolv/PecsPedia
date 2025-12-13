import { Stack } from 'expo-router'
import { UserModule } from './src/modules/UserModule/UserModule'
import { HeaderUser } from './src/modules/UserModule/components/HeaderUser/HeaderUser'

export default function UserScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          header: () => <HeaderUser title="PECSPEDIA" />,
        }}
      />
      <UserModule />
    </>
  )
}
