# Welcome to your Expo app 👋

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Tests (added)

This project includes unit test support and some testing utilities/mocks added to make hook testing reliable.

Run tests:

```bash
npm install
npm run test
```

Run a single test file:

```bash
npx jest app/src/hooks/__tests__/pictograms/usePictograms.test.ts --runInBand
```

Watch mode:

```bash
npx jest --watch
```

What was added for testing:

- `__mocks__/@react-native-async-storage/async-storage.ts` — manual AsyncStorage mock with helpers `setMockStorage`, `resetMockStorage`, `getMockStorage` and default keys so hooks that load data on mount don't hang.
- `jest.setup.js` — calls `jsdom-global()` early to create DOM globals.
- `test-setup.js` — resets the AsyncStorage mock before each test and registers `@testing-library/jest-native` matchers.
- `jest.config.js` and `babel.config.js` — configured to work with react-native + Babel transforms.
- `app/src/hooks/test-utils.ts` — helper `renderHookWithAct` that wraps `renderHook` in `act(...)` and flushes microtasks to avoid React `act(...)` warnings.

Troubleshooting:

- If `jest` isn't found, run `npm install` to rebuild `node_modules`.
- If you see `document is not defined`, ensure `jsdom` and `jsdom-global` are installed (they are included in devDependencies).
- If you see `An update to TestComponent inside a test was not wrapped in act(...)`, use `renderHookWithAct` or wrap updates in `act()`.

If you want, I can also add a CI (GitHub Actions) workflow to run tests on push/PR.
