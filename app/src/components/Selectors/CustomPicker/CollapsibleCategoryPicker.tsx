import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface PickerItem {
    label: string;
    value: string;
}

interface CollapsibleCategoryPickerProps {
    selectedValue: string;
    onValueChange: (itemValue: string) => void;
    items: PickerItem[];
}

export const CollapsibleCategoryPicker = ({
    selectedValue,
    onValueChange,
    items,
}: CollapsibleCategoryPickerProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const selectedLabel = items.find(item => item.value === selectedValue)?.label || 'Categorías';

    const handleSelectCategory = (value: string) => {
        onValueChange(value);
        setIsExpanded(false);
    };

    return (
        <>
            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsExpanded(true)}
            >
                <MaterialCommunityIcons
                    name="list-box-outline"
                    size={24}
                    color="#666"
                />
            </TouchableOpacity>

            <Modal
                visible={isExpanded}
                transparent
                animationType="fade"
                onRequestClose={() => setIsExpanded(false)}
            >
                <TouchableOpacity
                    style={styles.backdrop}
                    activeOpacity={1}
                    onPress={() => setIsExpanded(false)}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Seleccionar categoría</Text>
                            <TouchableOpacity
                                onPress={() => setIsExpanded(false)}
                            >
                                <MaterialCommunityIcons
                                    name="close"
                                    size={24}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={items}
                            keyExtractor={(item) => item.value}
                            scrollEnabled={items.length > 6}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.categoryItem,
                                        selectedValue === item.value && styles.categoryItemSelected,
                                    ]}
                                    onPress={() => handleSelectCategory(item.value)}
                                >
                                    <Text
                                        style={[
                                            styles.categoryLabel,
                                            selectedValue === item.value && styles.categoryLabelSelected,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                    {selectedValue === item.value && (
                                        <MaterialCommunityIcons
                                            name="check"
                                            size={20}
                                            color="#008080"
                                        />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    iconButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: '80%',
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    categoryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    categoryItemSelected: {
        backgroundColor: '#f0f8f8',
    },
    categoryLabel: {
        fontSize: 16,
        color: '#333',
    },
    categoryLabelSelected: {
        color: '#008080',
        fontWeight: '600',
    },
});
