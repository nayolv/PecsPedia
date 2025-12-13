import * as Speech from 'expo-speech';
import { useCallback } from 'react';
import { IPictogram } from '../types/PyctogramTypes';

export const useSpeech = () => {
    const speakPhrase = useCallback((phrase: IPictogram[]) => {
        const textToSpeak = phrase.map(p => p.text).join(' ');
        if (textToSpeak) {
            Speech.speak(textToSpeak, {
                language: 'es-MX',
                rate: 0.9,
            });
        }
    }, []);

    const stopSpeaking = useCallback(() => {
        Speech.stop();
    }, []);

    return {
        speakPhrase,
        stopSpeaking,
    };
};
