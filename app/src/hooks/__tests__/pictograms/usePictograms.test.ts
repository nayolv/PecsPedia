import AsyncStorage from '@react-native-async-storage/async-storage'
import { act } from '@testing-library/react-hooks'
import { IPictogram } from '../../../types/PyctogramTypes'
import { usePictograms } from '../../usePictograms'
import { renderHookWithAct } from '../test-utils'

// Importamos el mock de AsyncStorage para simularlo
// Use the manual mock located in __mocks__ for AsyncStorage
jest.mock('@react-native-async-storage/async-storage')

// Preparamos un pictograma de prueba para manipular el estado de la frase
const mockPicto: IPictogram = {
    id: '1',
    text: 'test',
    imageUri: 'uri',
    categoryIds: ['10'],
    audioUri: 'audioUri'
}

// Limpiamos el mock de AsyncStorage antes de cada prueba
beforeEach(() => {
    (AsyncStorage.clear as jest.Mock).mockClear();
    (AsyncStorage.setItem as jest.Mock).mockClear();
})

test('La función clearPhrase debe vaciar el array "phrase"', async () => {
    // 1. Montar el Hook
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([]));
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([]));

    const rendered = await renderHookWithAct(() => usePictograms())
    const result = rendered.result

    // Simulamos que ya hay un elemento en la frase
    act(() => {
        result.current.addPictoToPhrase(mockPicto)
    })

    // Verificamos que tiene un elemento ANTES de la limpieza
    expect(result.current.phrase.length).toBe(1)

    // 2. Actuar: Llamamos a la función clearPhrase
    act(() => {
        // LÍNEA CLAVE: Llama aquí a la función clearPhrase del hook
        result.current.clearPhrase()
    })

    // 3. Evaluar: Verificamos que el estado 'phrase' esté vacío
    // LÍNEA CLAVE: Verifica que el array 'phrase' en result.current tenga una longitud de 0
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
    // 1. Montar el Hook (asumiendo que empieza vacío, gracias al reset del beforeEach)
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([]));
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([]));

    const rendered = await renderHookWithAct(() => usePictograms());
    const result = rendered.result;

    // Verificamos el estado inicial
    expect(result.current.pictograms.length).toBe(0);

    // 2. Actuar: Llamamos a la función addPictogram
    await act(async () => {
        result.current.addPictogram(newPicto);
    });

    // 3. Evaluar el ESTADO: Verificar que el estado React se actualizó
    expect(result.current.pictograms.length).toBe(1);
    expect(result.current.pictograms[0].id).toBe('2');

    // 4. Evaluar la PERSISTENCIA (AsyncStorage):

    // LÍNEA CLAVE 1: ¿Cuántas veces se llamó a AsyncStorage.setItem?
    // Debe haberse llamado una vez dentro de addPictogram (la inicialización ya terminó).
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);

    // LÍNEA CLAVE 2: ¿Con qué datos se llamó a AsyncStorage.setItem?
    // Debe haberse llamado con la clave PICTO_STORAGE_KEY y un JSON del array que contiene newPicto.
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('@PecsPedia_Pictograms', JSON.stringify([newPicto]))
});