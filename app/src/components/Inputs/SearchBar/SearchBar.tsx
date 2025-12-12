import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

interface SearchBarProps extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
}

export const SearchBar = ({ value, onChangeText, style, ...props }: SearchBarProps) => {
    return (
        <TextInput
            style={[styles.searchInput, style]}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#666"
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    searchInput: {
        height: 55,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
        marginHorizontal: 10,
    },
});
