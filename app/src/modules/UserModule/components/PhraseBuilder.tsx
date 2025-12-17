import { BasicButton } from '@/app/src/components/Buttons/BasicButton/BasicButton';
import { IPictogram } from '@/app/src/types/PyctogramTypes';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const { height } = Dimensions.get('window');

interface PhraseBuilderProps {
    phrase: IPictogram[];
    onClear: () => void;
    onSpeak?: () => void;
}

export const PhraseBuilder = ({ phrase, onClear, onSpeak }: PhraseBuilderProps) => {
    return (
        <View style={styles.topSection}>
            <View style={styles.phraseWrapper}>
                <BasicButton
                    icon='volume-high'
                    title=""
                    variant="primary"
                    style={{ backgroundColor: "#444fb1ff", marginRight: 10, marginLeft: 10, minWidth: 60, paddingHorizontal: 10 }}
                    onPress={onSpeak}
                />
                <View style={styles.phraseContainer}>
                    <ScrollView horizontal contentContainerStyle={styles.phraseScrollContent} showsHorizontalScrollIndicator={false}>
                        {phrase.length === 0 ? (
                            <Text style={styles.placeholderText}></Text>
                        ) : (
                            phrase.map((picto, index) => (
                                <View key={`${picto.id}-${index}`} style={styles.phraseItem}>
                                    <Image source={{ uri: picto.imageUri }} style={styles.phraseImage} contentFit="contain" />
                                </View>
                            ))
                        )}
                    </ScrollView>
                </View>
                <BasicButton
                    icon='trash-can'
                    title=""
                    variant="danger"
                    style={{ backgroundColor: "#cf4e4eff", marginRight: 10, marginLeft: 10, minWidth: 60, paddingHorizontal: 10 }}
                    onPress={onClear}
                />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topSection: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height * 0.14,
        justifyContent: 'center',
        marginBottom: 15,
    },
    iconButton: {
        padding: 10,
    },
    phraseWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#81B3DB',
        borderRadius: 15,
        paddingVertical: 10,
        width: '90%',
    },
    phraseContainer: {
        flex: 1,
        backgroundColor: '#FFF8E1',
        borderRadius: 15,
        justifyContent: 'center',
        borderWidth: 0,
        paddingHorizontal: 10,
    },
    phraseScrollContent: {
        alignItems: 'center',
    },
    placeholderText: {
        color: '#AAA',
        fontStyle: 'italic',
    },
    phraseItem: {
        marginRight: 5,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    phraseImage: {
        width: '100%',
        height: '100%',
    },
});
