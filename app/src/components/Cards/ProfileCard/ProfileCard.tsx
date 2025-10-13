import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'

interface ProfileCardProps {
    text: string
    icon: string
    color: string
    onClick: () => void
}

const { width, height } = Dimensions.get('window')
const CARD_SIZE = height * 0.35

export const ProfileCard: React.FC<ProfileCardProps> = ({ text, icon, color, onClick }) => {
    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: color }]}
            onPress={onClick}
        >
            <MaterialCommunityIcons
                name={icon as any}
                size={CARD_SIZE / 3}
                color="#FFFFFF"
                style={styles.icon}
            />
            <Text style={styles.textLabel}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: CARD_SIZE * 0.9,
        height: CARD_SIZE * 0.9,
        borderRadius: 25,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    icon: {
        marginBottom: 10,
    },
    textLabel: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        paddingHorizontal: 10,
    },
})