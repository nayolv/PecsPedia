import { IPictogram } from '@/app/src/types/PyctogramTypes'
import { Image } from 'expo-image'
import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface PictogramCardProps {
    pictogram: IPictogram
    onPress: (picto: IPictogram) => void
    color?: string
    size?: number
}

const { width } = Dimensions.get('window')
const DEFAULT_SIZE = (width / 4) - 20

export const PictogramCard: React.FC<PictogramCardProps> = ({ pictogram, onPress, color = '#DDD', size }) => {
    const { imageUri, text } = pictogram
    const cardSize = size || DEFAULT_SIZE
    console.log('Rendering PictogramCard:', imageUri)

    return (
        <TouchableOpacity
            style={[styles.container, { borderColor: color, borderWidth: 5, width: cardSize, height: cardSize + 40 }]}
            onPress={() => onPress(pictogram)}
        >
            <View style={[styles.imageWrapper, { height: cardSize * 0.75 }]}>
                <Image style={styles.image} source={{ uri: imageUri }} contentFit="contain" />
            </View>
            <Text style={styles.textLabel} numberOfLines={1}>
                {text?.toUpperCase()}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
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