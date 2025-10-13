import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PictogramCard } from "../../components/Cards/PictogramCard/PictogramCard";
import { useDataHandler } from "../../hooks/useDataHandler";

const { height } = Dimensions.get('window');

export const UserModule: React.FC = () => {
    const { pictograms, categories, phrase, addPictoToPhrase, clearPhrase, isLoading } = useDataHandler();

    if (isLoading) (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Cargando pictogramas...</Text>
        </View>)


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.phraseStrip}>
                    <Text style={{ fontSize: 20 }}>Frase ({phrase.length} ítems)</Text>
                    <Text onPress={clearPhrase} style={{ color: 'red' }}>[BORRAR]</Text>
                </View>

                <View style={styles.pictogramArea}>
                    <FlatList
                        data={pictograms}
                        keyExtractor={(item) => item.id}
                        numColumns={4}
                        contentContainerStyle={styles.listContent}
                        renderItem={({ item }) => {
                            const color = categories.find(cat => cat.id === item.categoryIds[0])?.color
                            return <PictogramCard
                                pictogram={item}
                                onPress={addPictoToPhrase}
                                color={color}
                            />
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F0F0F0' },
    container: { flex: 1, margin: 5 },
    phraseStrip: {
        height: height * 0.25,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginVertical: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        flexDirection: 'row',
    },
    pictogramArea: {
        flex: 1,
        backgroundColor: '#DDD',
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})