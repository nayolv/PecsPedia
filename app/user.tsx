import { Stack } from 'expo-router'
import { UserModule } from './src/modules/UserModule/UserModule'

export default function UserScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <UserModule />
    </>
  )
}
