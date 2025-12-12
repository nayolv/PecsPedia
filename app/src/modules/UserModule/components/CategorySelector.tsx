import { ICategory } from '@/app/src/types/PyctogramTypes';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { height } = Dimensions.get('window');

interface CategorySelectorProps {
    categories: ICategory[];
    selectedCategoryId: string | null;
    onSelectCategory: (id: string | null) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, selectedCategoryId, onSelectCategory }) => {
    return (
        <View style={styles.bottomSection}>
            <View style={styles.categoriesWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
                    <TouchableOpacity
                        style={styles.categoryItem}
                        onPress={() => onSelectCategory(null)}
                    >
                        <View style={[
                            styles.categoryCircle,
                            {
                                backgroundColor: '#FF7043',
                                borderWidth: selectedCategoryId === null ? 3 : 0,
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
                                        borderWidth: selectedCategoryId === cat.id ? 3 : 0,
                                        borderColor: '#FFF'
                                    }]}>
                                {cat.imageUri ? (
                                    <Image source={{ uri: cat.imageUri }} style={styles.categoryImage} contentFit="contain" />
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
    );
};

const styles = StyleSheet.create({
    bottomSection: {
        height: height * 0.18,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 10,
    },
    categoriesWrapper: {
        width: '90%',
        backgroundColor: '#FFF8E1',
        alignSelf: 'center',
        borderRadius: 15,
        paddingVertical: 15,
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
        borderRadius: 30,
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
        width: '60%',
        height: '60%',
    },
    categoryText: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
    },
});
