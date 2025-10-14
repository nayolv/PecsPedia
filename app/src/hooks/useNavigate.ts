import { RelativePathString, UnknownInputParams, useRouter } from 'expo-router'

export const useNavigate = () => {
    const router = useRouter()
    const navigateTo = (route: RelativePathString, params?: UnknownInputParams) => router.push({
        pathname: route,
        params,
    })

    return navigateTo
}
