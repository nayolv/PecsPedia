import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { COLOR_PALETTE } from '../utils'

interface ColorSelectorProps {
    selectedColor: string
    onPress: CallableFunction
}

export const ColorSelector = ({ selectedColor, onPress }: ColorSelectorProps) => {

    return (
        <View style={styles.colorPaletteContainer}>
            {COLOR_PALETTE.map((paletteColor) => (
                <TouchableOpacity
                    key={paletteColor}
                    onPress={() => onPress(paletteColor)}
                    style={[
                        styles.colorCircle,
                        { backgroundColor: paletteColor },
                        selectedColor === paletteColor && styles.selectedColorCircle,
                    ]}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    colorPaletteContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 15,
        paddingHorizontal: 5,
    },
    colorCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 6,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    selectedColorCircle: {
        borderWidth: 4,
        borderColor: '#333',
    },
})