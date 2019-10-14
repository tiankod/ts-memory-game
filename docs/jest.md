# Les tests unitaires avec Jest

## Installation

### Installation des paquets

```sh
yarn add -D jest ts-jest @types/jest
```

### Fichier de configuration

cmd

```sh
npx jest --init
```

Modification de jest.config.js

```js
  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>/src"
  ],
  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
```

### Ajout d'un script dans package.json

```json
  "scripts": {
    ...
    "test": "jest --watch"
  },
```

### Tester installation de Jest

Créer 2 fichiers de tests sous src sum.ts et sum.spec.ts.

sum.ts

```ts
export const sum
  = (...a: number[]) =>
    a.reduce((acc, val) => acc + val, 0);
```

sum.spec.ts

```ts
import { sum } from './sum';

test('basic', () => {
  expect(sum()).toBe(0);
});

test('basic again', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Lancement du test

```sh
npx jest
```

ou

```sh
yarn test
```

Résultat

```log
 PASS  src/sum.spec.ts
  √ basic (4ms)
  √ basic again

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        4.479s
Ran all test suites related to changed files.

```

__Attention !__ ts-jest vérifie les tests unitaires, mais ne compile pas les ts en js.  
En effet, vous pouvez remarquerez l'absence de nouveaux fichiers .js dans le build.
