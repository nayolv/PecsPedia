import { Image, Text, TouchableOpacity, View } from 'react-native'
import { formStyles } from './styles'

interface ImageUploaderProps {
    imageUri?: string
    onPress: () => void
}

export const ImageUploader = ({ imageUri, onPress }: ImageUploaderProps) => {
    return (
        <View style={formStyles.imageUploadContainer}>
            <TouchableOpacity
                style={formStyles.imagePlaceholder}
                onPress={onPress}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={formStyles.previewImage} />
                ) : (
                    <Text style={formStyles.imageText}>Click para Subir Imagen</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}
