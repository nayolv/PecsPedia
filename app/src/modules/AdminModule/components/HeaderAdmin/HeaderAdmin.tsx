import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

interface HeaderAdminProps {
    title: string
}

export const HeaderAdmin = ({ title }: HeaderAdminProps) => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{title}</Text>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    safeArea: {
        backgroundColor: '#6BAABB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6BAABB',
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#5A99A5',
        zIndex: 15,
        paddingTop: 30,
        height: 81,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        flex: 1,
        textAlign: 'center',
    },
})
