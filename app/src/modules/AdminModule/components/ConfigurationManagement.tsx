import { BasicButton } from "@/app/src/components/Buttons/BasicButton/BasicButton"
import { useAdminPin } from "@/app/src/hooks/useAdminPin"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

export const ConfigurationManagement = () => {
    const { pin, setPin, removePin, hasPin } = useAdminPin()
    const [newPin, setNewPin] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (pin) {
            setNewPin(pin)
        } else {
            setNewPin('')
        }
    }, [pin])

    const handleSave = async () => {
        if (newPin.length < 4) {
            Alert.alert('Error', 'El PIN debe tener al menos 4 dígitos')
            return
        }
        await setPin(newPin)
        Alert.alert('Éxito', 'PIN configurado correctamente')
    }

    const handleRemove = async () => {
        Alert.alert(
            'Confirmar',
            '¿Estás seguro de que quieres eliminar el PIN?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        await removePin()
                        setNewPin('')
                        Alert.alert('Éxito', 'PIN eliminado')
                    }
                }
            ]
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>

                <View style={styles.card}>
                    <Text style={styles.title}>Seguridad</Text>
                    <Text style={styles.description}>
                        Configura un PIN para proteger el acceso al módulo de administración.
                    </Text>

                    <View style={styles.formContainer}>
                        {hasPin && <Text style={styles.statusText}>✅ PIN configurado actualmente</Text>}

                        <View style={styles.row}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={newPin}
                                    onChangeText={setNewPin}
                                    placeholder={hasPin ? "Cambiar PIN" : "Ingresa nuevo PIN"}
                                    keyboardType="numeric"
                                    secureTextEntry={!isVisible}
                                    maxLength={6}
                                />
                                <TouchableOpacity onPress={() => setIsVisible(!isVisible)} style={styles.eyeIcon}>
                                    <MaterialCommunityIcons name={isVisible ? "eye-off" : "eye"} size={24} color="#666" />
                                </TouchableOpacity>
                            </View>

                            {hasPin && (
                                <TouchableOpacity onPress={handleRemove} style={styles.deleteButton}>
                                    <MaterialCommunityIcons name="trash-can-outline" size={24} color="white" />
                                </TouchableOpacity>
                            )}
                        </View>

                        <BasicButton
                            title="Guardar Configuración"
                            icon="content-save-all"
                            variant="primary"
                            onPress={handleSave}
                            style={styles.button}
                        />
                    </View>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
        flex: 1,
    },
    wrapper: {
        flex: 1,
        alignSelf: 'center',
        maxWidth: 800,
        width: '100%',

    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    statusContainer: {
        alignItems: 'center',
        gap: 15,
    },
    statusText: {
        fontSize: 18,
        color: '#4CAF50',
        fontWeight: '600',
    },
    formContainer: {
        gap: 15,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        height: 50,
    },
    input: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 15,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 10,
    },
    deleteButton: {
        backgroundColor: '#FF5252',
        height: 50,
        width: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '100%',
    }
})
