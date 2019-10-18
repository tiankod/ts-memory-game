# Les tests unitaires avec Jest

## Pourquoi jest

Jest est un framework moderne, plus récent que Jasmine ou Mocha. Il est intégré dans ReactJS et VueJS, et il est possible de l'intégrer dans Angular.  
Et surtout, jest permet de mocker facilement et de simuler des événements DOM (en collaboration avec Enzyme/vue-test-util).

## Les modules

Les tests sont écrits dans un fichier séparé. Pour cela, il faut importer le code à tester dans le fichier de tests. Il faut donc intégrer les modules.  
Ceci signifie que vous allez ajouter le mot clef `export` dans vos sources.  
La gestion des modules en js est problématique car non normée.
Se référer au document [typescript](./typescript.md) pour comprendre la gestion des modules dans une application Typescript compilée en Typescript et destinée à être exécutée sur un browser.  
Pour notre application, nous utilisons le transpileur Typescript. Or la doc de jest recommande Babel ou Webpack.
Ceci fonctionne néanmoins, mais avec une alerte lors de l'exécution des tests unitaires.

## Installation

### Installation des paquets

```sh
yarn add -D jest ts-jest @types/jest
```

### Fichiers de configuration

#### jest.config.js

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

#### tsconfig.json

Ajout dans exclude des fichiers de tests

```json
 "exclude": [
        ...
        "**/*.spec.ts",
    ]
```

#### Ajout d'un script dans package.json

```json
  "scripts": {
    ...
    "test": "jest --watch"
  },
```

### Tester installation de Jest

* Création d'un dossier test qui contiendra tous les tests unitaires.
* Créer 2 fichiers de tests sous test sum.ts et sum.spec.ts.

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

Vous n'obtenez pas ce résultat, revoyez la config.
Le résultat est concluant, supprimer ces 2 fichiers

## Création de tests unitaires

* Les jeux de tests sont écrits dans des fichiers ts ayant pour extension `spec.ts` ou `.test.ts`. Vous les placez soit dans le dossier du source à tester, soit dans le dossier `__test__`.
* La doc jest sur leur [site](https://jestjs.io/docs/en/getting-started)
* des exemples
  * tester un click avec [oc](https://openclassrooms.com/fr/courses/4664381-realisez-une-application-web-avec-react-js/4664926-simulez-des-evenements)
  * des exemples complet avec [zetcode](http://zetcode.com/javascript/jest/)
  * tuto [Grafikart](https://www.grafikart.fr/tutoriels/jest-test-framework-1202)

## Bilan

### Les plus

* Jest a du potentiel
* Facile à installer
* Syntaxe ressemble beaucoup à Jasmine
* Lecture facile des résultats de test
* utilisation de JSDOM
* gestion procedure asynchrone
* code coverage (non implémenté ici).
* se branche avec d'autres outils
* doc conséquente
* intégré à React, VueJS, possibilité pour Angular

### Les moins

* Demande de babel ou WebPack pour meilleur exploitation
* Surtout basé autour de React (dont la doc)
* Courbe d'apprentissage => temps à passer
* Si POO avec encapsulation, obligation de rendre public certains éléments de la classe uniquement pour les tests.
* Si on veut faire de vrais tests rapides, il faut passer par un fwk.

### Les questions

* la gestion des événements doit se faire avec Enzyme ?
* feuille de styles => approfondir
* Pas trop compris
  * les mock
  * jest.fn() à creuser
