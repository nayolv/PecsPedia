import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { PIN_STORAGE_KEY } from '../utils/consts'

export const useAdminPin = () => {
    const [pin, setPinState] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadPin()
    }, [])

    const loadPin = async () => {
        try {
            const storedPin = await AsyncStorage.getItem(PIN_STORAGE_KEY)
            setPinState(storedPin)
        } catch (error) {
            console.error('Error loading PIN:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const setPin = async (newPin: string) => {
        try {
            await AsyncStorage.setItem(PIN_STORAGE_KEY, newPin)
            setPinState(newPin)
        } catch (error) {
            console.error('Error setting PIN:', error)
        }
    }

    const removePin = async () => {
        try {
            await AsyncStorage.removeItem(PIN_STORAGE_KEY)
            setPinState(null)
        } catch (error) {
            console.error('Error removing PIN:', error)
        }
    }

    const verifyPin = (inputPin: string) => {
        return pin === inputPin
    }

    return {
        pin,
        isLoading,
        setPin,
        removePin,
        verifyPin,
        hasPin: !!pin
    }
}
