import { useNavigationState } from "@react-navigation/native"
import { Stack, useNavigation } from "expo-router"
import { View } from "react-native"
import { CustomHeader } from "./src/components/Layout/Header/CustomHeader"
import { titleMap } from "./src/router/titleMap"

export default function RootLayout() {
  const navigation = useNavigation()
  const state = useNavigationState(state => state)
  const currentRouteName = state?.routes[state.index]?.name
  const headerTitle = titleMap?.[currentRouteName] || currentRouteName || 'Cargando...'

  const canGoBack = state?.index > 0
  console.log(state.index, 'routes')
  const handleGoBack = () => {
    if (canGoBack) {
      navigation.goBack()
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {currentRouteName !== '__root' &&
        <CustomHeader
          title={headerTitle}
          onBackPress={handleGoBack}
        />
      }
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  )
}