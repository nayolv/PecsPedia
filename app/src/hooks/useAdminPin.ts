import { useAuth } from '../contexts/AuthContext'

export const useAdminPin = () => {
    return useAuth()
}
