import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

interface CustomHeaderProps {
    title: string;
    showBackButton?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
}

export const CustomHeader = ({ title, showBackButton = true, containerStyle, titleStyle }: CustomHeaderProps) => {
    const router = useRouter();

    return (
        <View style={[styles.headerContainer, containerStyle]}>
            {showBackButton && (
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <MaterialCommunityIcons
                        name="arrow-left-circle"
                        size={35}
                        color="#fff"
                    />
                </TouchableOpacity>
            )}
            <Text style={[styles.titleText, titleStyle]}>{title?.toUpperCase()}</Text>
            {showBackButton && <View style={styles.placeholder} />}
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 15,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffffff',
        textAlign: 'center',
        flex: 1,
    },
    backButton: {
        padding: 5,
        zIndex: 1,
    },
    placeholder: {
        width: 40,
    }
});