
let storage: { [key: string]: string } = {};

const DEFAULT_KEYS = {
    '@PecsPedia_Pictograms': JSON.stringify([]),
    '@PecsPedia_Categories': JSON.stringify([]),
};

function setMockStorage(initial: { [key: string]: string }) {
    storage = { ...initial };
}

function resetMockStorage() {
    storage = { ...DEFAULT_KEYS };
}

function getMockStorage() {
    return storage;
}

resetMockStorage();

const asyncStorageMock = {
    getItem: jest.fn(async (key: string) => (storage[key] !== undefined ? storage[key] : null)),
    setItem: jest.fn(async (key: string, value: string) => {
        storage[key] = value;
    }),
    removeItem: jest.fn(async (key: string) => {
        delete storage[key];
    }),
    clear: jest.fn(async () => {
        storage = {};
    }),
    getAllKeys: jest.fn(async () => Object.keys(storage)),
};

export default asyncStorageMock;
export { getMockStorage, resetMockStorage, setMockStorage };

