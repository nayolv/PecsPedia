import { IPictogram } from '@/app/src/types/PyctogramTypes'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface PictogramCardProps {
    pictogram: IPictogram
    onPress: (picto: IPictogram) => void
    color?: string
}

const { width } = Dimensions.get('window')
const CARD_SIZE = (width / 4) - 20

export const PictogramCard: React.FC<PictogramCardProps> = ({ pictogram, onPress, color = '#DDD' }) => {
    const { imageUri, text } = pictogram

    return (
        <TouchableOpacity
            style={[styles.container, { borderColor: color, borderWidth: 5 }]}
            onPress={() => onPress(pictogram)}
        >
            <View style={styles.imageWrapper}>
                <Image style={styles.image} source={{ uri: imageUri }} />
            </View>
            <Text style={styles.textLabel} numberOfLines={1}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: CARD_SIZE,
        height: CARD_SIZE + 40,
        margin: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    imageWrapper: {
        width: '100%',
        height: CARD_SIZE * 0.75,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7F7F7',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    iconPlaceholder: {
        fontSize: 100,
    },
    textLabel: {
        paddingVertical: 5,
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        width: '90%',
    },
})