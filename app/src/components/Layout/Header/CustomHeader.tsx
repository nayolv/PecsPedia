import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

interface CustomHeaderProps {
    title: string;
    containerStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
}

export const CustomHeader = ({ title, containerStyle, titleStyle }: CustomHeaderProps) => {
    return (
        <View style={[styles.headerContainer, containerStyle]}>
            <Text style={[styles.titleText, titleStyle]}>{title?.toUpperCase()}</Text>
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

});