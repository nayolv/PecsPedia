import { Picker } from '@react-native-picker/picker';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface PickerItem {
    label: string;
    value: string;
}

interface CustomPickerProps {
    selectedValue: string;
    onValueChange: (itemValue: string) => void;
    items: PickerItem[];
    style?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
}

export const CustomPicker = ({ selectedValue, onValueChange, items, style, containerStyle }: CustomPickerProps) => {
    return (
        <View style={[styles.pickerContainer, containerStyle]}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                style={[styles.picker, style]}
            >
                {items.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: 55,
    },
    picker: {
        width: '100%',
        height: '100%',
    },
});
