import { Stack } from 'expo-router'
import { useState } from 'react'
import { Alert, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { BasicButton } from './src/components/Buttons/BasicButton/BasicButton'
import { ProfileCard } from './src/components/Cards/ProfileCard/ProfileCard'
import { CustomHeader } from './src/components/Layout/Header/CustomHeader'
import { useAdminPin } from './src/hooks/useAdminPin'
import { useNavigate } from './src/hooks/useNavigate'
import { baseRoutes } from './src/router/routes'

export default function IndexScreen() {
  const navigate = useNavigate()
  const { hasPin, verifyPin } = useAdminPin()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [inputPin, setInputPin] = useState('')

  const CHILD_ICON = 'face-man-shimmer-outline'
  const ADMIN_ICON = 'cog-outline'

  const handleAdminClick = () => {
    if (hasPin) {
      setIsModalVisible(true)
    } else {
      navigate(baseRoutes.admin)
    }
  }

  const handlePinSubmit = () => {
    if (verifyPin(inputPin)) {
      setIsModalVisible(false)
      setInputPin('')
      navigate(baseRoutes.admin, { verified: 'true' })
    } else {
      Alert.alert('Error', 'PIN incorrecto')
      setInputPin('')
    }
  }

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
            onClick={handleAdminClick}
          />
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="shield-lock-outline" size={48} color="#008080" />
              </View>
              <Text style={styles.modalTitle}>Acceso Administrativo</Text>
              <Text style={styles.modalSubtitle}>Ingrese su PIN de 4 dígitos</Text>
              
              <TextInput
                style={styles.modalInput}
                value={inputPin}
                onChangeText={setInputPin}
                keyboardType="numeric"
                secureTextEntry
                maxLength={6}
                autoFocus
                placeholder="••••"
                placeholderTextColor="#CBD5E1"
                selectionColor="#008080"
              />
              
              <View style={styles.modalButtons}>
                <BasicButton
                  title="Cancelar"
                  variant="secondary"
                  onPress={() => {
                    setIsModalVisible(false)
                    setInputPin('')
                  }}
                  style={styles.cancelButton}
                />
                <BasicButton
                  title="Acceder"
                  variant="primary"
                  onPress={handlePinSubmit}
                  style={styles.accessButton}
                />
              </View>
            </View>
          </View>
        </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(5px)', // Works on web/some versions
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    width: '90%',
    maxWidth: 400,
  },
  iconContainer: {
    backgroundColor: '#E0F2F1',
    padding: 16,
    borderRadius: 50,
    marginBottom: 20,
  },
  modalTitle: {
    marginBottom: 8,
    textAlign: "center",
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  modalSubtitle: {
    marginBottom: 24,
    textAlign: "center",
    fontSize: 16,
    color: '#6B7280',
  },
  modalInput: {
    height: 60,
    width: '100%',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    marginBottom: 24,
    paddingHorizontal: 15,
    fontSize: 28,
    textAlign: 'center',
    letterSpacing: 8,
    fontWeight: '600',
    color: '#1F2937',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#EF4444',
  },
  accessButton: {
    flex: 1,
    backgroundColor: '#008080',
  }
})