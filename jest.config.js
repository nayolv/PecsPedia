module.exports = {
    preset: 'react-native',
    testEnvironment: 'node',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|webp|svg)$": '<rootDir>/__mocks__/fileMock.js',
        "^@/(.*)$": '<rootDir>/$1',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(react-native|@react-native|@react-native-async-storage)/)'
    ],
    testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
    setupFiles: ['<rootDir>/jest.setup.js'],
    setupFilesAfterEnv: ['<rootDir>/test-setup.js'],
}
