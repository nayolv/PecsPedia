import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDataHandler } from "../../hooks/useDataHandler";
import { CategorySelector } from "./components/CategorySelector";
import { PhraseBuilder } from "./components/PhraseBuilder";
import { PictogramGrid } from "./components/PictogramGrid";

export const UserModule: React.FC = () => {
    const { loadData, pictograms, categories, phrase, addPictoToPhrase, clearPhrase, isLoading } = useDataHandler();
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    useEffect(() => {
        loadData()
    }, [])

    const filteredPictograms = useMemo(() => {
        if (!selectedCategoryId) return pictograms;
        return pictograms.filter(p => p.categoryIds.includes(selectedCategoryId));
    }, [pictograms, selectedCategoryId]);

    if (isLoading) return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Cargando pictogramas...</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <PhraseBuilder
                phrase={phrase}
                onClear={clearPhrase}
            />
            <PictogramGrid
                pictograms={filteredPictograms}
                categories={categories}
                onPictoPress={addPictoToPhrase}
            />
            <CategorySelector
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={setSelectedCategoryId}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#c7f1e9ff' },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
