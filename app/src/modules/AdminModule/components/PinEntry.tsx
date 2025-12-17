import { BasicButton } from "@/app/src/components/Buttons/BasicButton/BasicButton"
import { useAdminPin } from "@/app/src/hooks/useAdminPin"
import { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

interface PinEntryProps {
    onSuccess: () => void
}

export const PinEntry = ({ onSuccess }: PinEntryProps) => {
    const { verifyPin } = useAdminPin()
    const [pin, setPin] = useState('')
    const [error, setError] = useState('')

    const handleVerify = () => {
        if (verifyPin(pin)) {
            onSuccess()
        } else {
            setError('PIN incorrecto')
            setPin('')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Ingresa tu PIN</Text>
                <Text style={styles.subtitle}>Para acceder al panel de administración</Text>

                <TextInput
                    style={styles.input}
                    value={pin}
                    onChangeText={(text) => {
                        setPin(text)
                        setError('')
                    }}
                    placeholder="PIN"
                    keyboardType="numeric"
                    secureTextEntry
                    maxLength={6}
                    autoFocus
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <BasicButton
                    title="Ingresar"
                    onPress={handleVerify}
                    variant="primary"
                    style={styles.button}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#E6EDED',
    },
    card: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 20,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
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
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        letterSpacing: 5,
    },
    error: {
        color: '#FF5252',
        marginBottom: 15,
        fontSize: 14,
    },
    button: {
        width: '100%',
    }
})
