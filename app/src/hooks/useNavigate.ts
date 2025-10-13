import { RelativePathString, useRouter } from 'expo-router'

export const useNavigate = () => {
    const router = useRouter()
    const navigateTo = (route: RelativePathString) => router.push(route)

    return navigateTo
}
