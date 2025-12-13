import { PictogramCard } from '@/app/src/components/Cards/PictogramCard/PictogramCard';
import { ICategory, IPictogram } from '@/app/src/types/PyctogramTypes';
import React from 'react';
import { FlatList, StyleSheet, View, useWindowDimensions } from 'react-native';

interface PictogramGridProps {
    pictograms: IPictogram[];
    categories: ICategory[];
    onPictoPress: (picto: IPictogram) => void;
}

export const PictogramGrid: React.FC<PictogramGridProps> = ({ pictograms, categories, onPictoPress }) => {
    const { width, height } = useWindowDimensions();
    const isPortrait = height > width;

    const minColumnWidth = 140;
    const availableWidth = width - 10;

    const minCols = isPortrait ? 3 : 5;
    const numColumns = Math.max(minCols, Math.floor(availableWidth / minColumnWidth));

    const cardSize = (availableWidth / numColumns) - 16;
    return (
        <View style={styles.middleSection}>
            <FlatList
                key={numColumns}
                data={pictograms}
                keyExtractor={(item) => item.id}
                numColumns={numColumns}
                contentContainerStyle={styles.gridContent}
                renderItem={({ item }) => {
                    const color = categories.find(cat => cat.id === item.categoryIds[0])?.color;
                    return (
                        <PictogramCard
                            pictogram={item}
                            onPress={onPictoPress}
                            color={color}
                            size={cardSize}
                        />
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    middleSection: {
        flex: 1,
        paddingTop: 10,
    },
    gridContent: {
        paddingHorizontal: 5,
        paddingBottom: 20,
        alignItems: 'center',
    },
});
