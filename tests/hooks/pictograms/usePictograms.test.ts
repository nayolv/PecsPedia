import AsyncStorage from '@react-native-async-storage/async-storage'
import { act } from '@testing-library/react-hooks'
import { usePictograms } from '../../../app/src/hooks/usePictograms'
import { IPictogram } from '../../../app/src/types/PyctogramTypes'
import { renderHookWithAct } from '../../test-utils'


jest.mock('@react-native-async-storage/async-storage')

const mockPicto: IPictogram = {
    id: '1',
    text: 'test',
    imageUri: 'uri',
    categoryIds: ['10'],
    audioUri: 'audioUri'
}

beforeEach(() => {
    (AsyncStorage.clear as jest.Mock).mockClear();
    (AsyncStorage.setItem as jest.Mock).mockClear();
})

test('La función clearPhrase debe vaciar el array "phrase"', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([]));
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([]));

    const rendered = await renderHookWithAct(() => usePictograms())
    const result = rendered.result

    act(() => {
        result.current.addPictoToPhrase(mockPicto)
    })

    expect(result.current.phrase.length).toBe(1)

    act(() => {
        result.current.clearPhrase()
    })


    expect(result.current.phrase.length).toBe(0)
})

const newPicto: IPictogram = {
    id: '2',
    text: 'Jugar',
    imageUri: 'uri_jugar',
    categoryIds: ['20'],
    audioUri: 'jugar_audio'
};

test('La función addPictogram debe añadir el pictograma al estado Y guardarlo en AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([]));
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([]));

    const rendered = await renderHookWithAct(() => usePictograms());
    const result = rendered.result;

    expect(result.current.pictograms.length).toBe(0);

    await act(async () => {
        result.current.addPictogram(newPicto);
    });

    expect(result.current.pictograms.length).toBe(1);
    expect(result.current.pictograms[0].id).toBe('2');


    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith('@PecsPedia_Pictograms', JSON.stringify([newPicto]))
});
