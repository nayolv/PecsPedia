import { ICategory } from '@/app/src/types/PyctogramTypes';
import { getImageSource } from '@/app/src/utils/imageResolver';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { height } = Dimensions.get('window');

interface CategorySelectorProps {
    categories: ICategory[];
    selectedCategoryId: string | null;
    onSelectCategory: (id: string | null) => void;
    isExpanded: boolean;
    onToggle: () => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
    categories,
    selectedCategoryId,
    onSelectCategory,
    isExpanded,
    onToggle
}) => {
    if (!isExpanded) {
        return (
            <View style={styles.fabContainer}>
                <TouchableOpacity
                    style={styles.fab}
                    onPress={onToggle}
                >
                    <Ionicons name="grid" size={28} color="#FFF" />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={onToggle}
            >
                <Ionicons name="close" size={24} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.categoriesWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
                    <TouchableOpacity
                        style={styles.categoryItem}
                        onPress={() => onSelectCategory(null)}
                    >
                        <View style={[
                            styles.categoryCircle,
                            {
                                backgroundColor: '#6BAABB',
                                borderWidth: selectedCategoryId === null ? 4 : 2,
                                borderColor: '#FFF'
                            }]}>
                            <Ionicons name="grid" size={24} color="#FFF" />
                        </View>
                        <Text style={styles.categoryText}>Todos</Text>
                    </TouchableOpacity>

                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={styles.categoryItem}
                            onPress={() => onSelectCategory(cat.id)}
                        >
                            <View
                                style={[
                                    styles.categoryCircle,
                                    {
                                        backgroundColor: cat.color,
                                        borderWidth: selectedCategoryId === cat.id ? 5 : 2,
                                        borderColor: cat.color,
                                    }]}>
                                {cat.imageUri ? (
                                    <Image source={getImageSource(cat.imageUri)} style={styles.categoryImage} contentFit="cover" />
                                ) : (
                                    <Text style={{ fontSize: 10 }}>{cat.name.substring(0, 2)}</Text>
                                )}
                            </View>
                            <Text style={styles.categoryText} numberOfLines={1}>{cat.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 10,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        zIndex: 10,
    },
    fab: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6BAABB',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    closeButton: {
        position: 'absolute',
        top: -15,
        right: 10,
        zIndex: 15,
        backgroundColor: '#E74C3C',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    categoriesWrapper: {
        width: '90%',
        backgroundColor: '#FFF8E1',
        alignSelf: 'center',
        borderRadius: 15,
        paddingVertical: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    categoriesScroll: {
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 20,
        width: 70,
    },
    categoryCircle: {
        width: 60,
        height: 60,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    categoryImage: {
        width: '100%',
        height: '100%',
    },
    categoryText: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
    },
})