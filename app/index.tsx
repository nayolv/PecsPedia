import { Stack } from 'expo-router'
import { useState } from 'react'
import { Alert, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
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
      navigate(baseRoutes.admin)
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
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Ingrese PIN de Administrador</Text>
              <TextInput
                style={styles.modalInput}
                value={inputPin}
                onChangeText={setInputPin}
                keyboardType="numeric"
                secureTextEntry
                maxLength={6}
                autoFocus
              />
              <View style={styles.modalButtons}>
                <BasicButton
                  title="Cancelar"
                  variant="danger"
                  onPress={() => {
                    setIsModalVisible(false)
                    setInputPin('')
                  }}
                  style={{ width: 120 }}
                />
                <BasicButton
                  title="Acceder"
                  variant="primary"
                  onPress={handlePinSubmit}
                  style={{ width: 120, backgroundColor: '#4CAF50' }}
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
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold'
  },
  modalInput: {
    height: 50,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 5
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10
  }
})