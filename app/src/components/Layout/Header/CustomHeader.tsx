import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface CustomHeaderProps {
    title: string;
}

export const CustomHeader = ({ title }: CustomHeaderProps) => {

    return (
        <View style={styles.headerContainer}>
            <View>
                <TouchableOpacity style={styles.backButton}>
                    <MaterialCommunityIcons name="home" size={50} color="#000" />
                </TouchableOpacity>
                <Text>Inicio</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 15,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonPlaceholder: {
        width: 30,
    }
});