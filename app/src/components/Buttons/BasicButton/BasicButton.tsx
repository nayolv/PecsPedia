import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
    StyleProp
} from 'react-native';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

export interface BasicButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    icon?: IconName;
    isLoading?: boolean;
    disabled?: boolean;
}

export const BasicButton = ({
    title,
    onPress,
    variant = 'primary',
    style,
    textStyle,
    icon,
    isLoading = false,
    disabled = false,
    ...props
}: BasicButtonProps) => {
    const getBackgroundColor = () => {
        if (disabled) return '#ccc';
        switch (variant) {
            case 'primary': return '#6AA5B7';
            case 'secondary': return '#6c757d';
            case 'danger': return '#dc3545';
            case 'outline': return 'transparent';
            default: return '#6AA5B7';
        }
    };

    const getTextColor = () => {
        if (disabled) return '#666';
        if (variant === 'outline') {
            return '#6AA5B7';
        }
        return '#fff';
    };

    const getBorderColor = () => {
        if (variant === 'outline') return disabled ? '#ccc' : '#6AA5B7';
        return 'transparent';
    };

    const textColor = getTextColor();

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || isLoading}
            style={[
                styles.button,
                {
                    backgroundColor: getBackgroundColor(),
                    borderColor: getBorderColor(),
                    borderWidth: variant === 'outline' ? 2 : 0,
                },
                style
            ]}
            activeOpacity={0.7}
            {...props}
        >
            {isLoading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <>
                    {icon && (
                        <MaterialCommunityIcons
                            name={icon}
                            size={20}
                            color={textColor}
                            style={styles.icon}
                        />
                    )}
                    <Text style={[styles.text, { color: textColor }, textStyle]}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        minWidth: 100,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    icon: {
        marginRight: 8,
    }
});
