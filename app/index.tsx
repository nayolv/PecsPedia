import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { ProfileCard } from './src/components/Cards/ProfileCard/ProfileCard'
import { CustomHeader } from './src/components/Layout/Header/CustomHeader'
import { useNavigate } from './src/hooks/useNavigate'
import { baseRoutes } from './src/router/routes'

export default function IndexScreen() {
  const navigate = useNavigate()

  const CHILD_ICON = 'face-man-shimmer-outline'
  const ADMIN_ICON = 'cog-outline'

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <CustomHeader title="PECSPEDIA" showBackButton={false} containerStyle={{ backgroundColor: '#81B3DB' }} />,
        }}
      />
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <ProfileCard
            text="USUARIO"
            icon={CHILD_ICON}
            color="#81B3DB"
            onClick={() => navigate(baseRoutes.user)}
          />
          <ProfileCard
            text="Perfil del Administrador"
            icon={ADMIN_ICON}
            color="#008080"
            onClick={() => navigate(baseRoutes.admin)}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F4EB',
  },
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  passwordInput: {
    width: '50%',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    textAlign: 'center',
    fontSize: 24,
    color: '#333',
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 15,
  }
})