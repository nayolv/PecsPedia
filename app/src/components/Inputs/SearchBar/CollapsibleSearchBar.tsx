import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Animated,
    StyleSheet,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';

interface CollapsibleSearchBarProps extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
}

export const CollapsibleSearchBar = ({
    value,
    onChangeText,
    style,
    ...props
}: CollapsibleSearchBarProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const widthAnim = useRef(new Animated.Value(50)).current;
    const inputRef = useRef<TextInput>(null);

    const handleExpandSearch = () => {
        setIsExpanded(true);
        Animated.timing(widthAnim, {
            toValue: 300,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            inputRef.current?.focus();
        });
    };

    const handleCollapseSearch = () => {
        setIsExpanded(false);
        onChangeText('');
        Animated.timing(widthAnim, {
            toValue: 50,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    width: widthAnim,
                },
            ]}
        >
            {!isExpanded ? (
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={handleExpandSearch}
                >
                    <MaterialCommunityIcons
                        name="magnify"
                        size={24}
                        color="#666"
                    />
                </TouchableOpacity>
            ) : (
                <View style={styles.inputWrapper}>
                    <TextInput
                        ref={inputRef}
                        style={[styles.searchInput, style]}
                        value={value}
                        onChangeText={onChangeText}
                        placeholderTextColor="#666"
                        onBlur={handleCollapseSearch}
                        {...props}
                    />
                    {value.length > 0 && (
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={() => onChangeText('')}
                        >
                            <MaterialCommunityIcons
                                name="close"
                                size={18}
                                color="#666"
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
        height: 45,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    clearButton: {
        padding: 5,
        marginLeft: 5,
    },
});
