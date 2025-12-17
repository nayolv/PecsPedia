import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface RoundedButtonProps extends TouchableOpacityProps {
    btnStyle?: ViewStyle
    iconStyle?: TextStyle
    icon?: IconName
}

export const RoundedButton = ({ icon = 'human-child', iconStyle, btnStyle, style, ...rest }: RoundedButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.button, btnStyle, style]}
            {...rest}
        >
            <Text style={styles.text}>
                <MaterialCommunityIcons
                    style={[styles.icon, { ...iconStyle }]}
                    name={icon}
                />
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        elevation: 8,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    text: {
        fontSize: 30,
        color: '#FFFFFF',
    },
    icon: {
        color: '#FFFFFF',
        fontSize: 30,
    }
})
