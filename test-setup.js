// Reset manual mocks and extend jest-native matchers
const { resetMockStorage } = require('./__mocks__/@react-native-async-storage/async-storage');
const matchers = require('@testing-library/jest-native/extend-expect');

beforeEach(() => {
    resetMockStorage();
});

module.exports = matchers;
