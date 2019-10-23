# Document technique

Ce document explique les choix de développement de cette solution.

## Environnement de travail

### Éditeur de code

* VS Code
* extension écriture Typescript
  * Javascript (ES6) code snippets
  * eslint
  * Code Spell Checker
  * markdownlint
* extensions tests unitaires
  * Jest
  * Jest Snippets
* extensions exécution
  * Debugger for Chrome
  * Live Server
  * view-in-browser
* paramétrage de VSC
  * settings.json
  
    ```json
    "editor.snippetSuggestions": "top"
    ```

### Exécution des tests unitaires

* jest
* Ajout d'un script dans package.json

    ```json
    "test": "jest --watch"
    ```

* test avec VSC
* test en cli
  * cmd
  * yarn test

## Tout est en dynamique

Le but de cet exercice est de s'habituer au langage Typescript. Donc tout est fait pour minimisé le HTML et le CSS.  
Le fichier HTML est au minimum. Ceci signifie que l'affichage des éléments est géré par du JS (manipulation du DOM).
La mise en page est dans le fichier CSS. Nous utilisons le CSS Grid Layout comme mise en page. Vous ne trouverez pas d'animation dans ce projet.

## Découpage des sources

L'application est réunie dans un seul fichier : MemoryGame.ts. Nous y retrouvons les 3 classes liées par des dépendances directes :

* MemoryGame : c'est le jeu
* Deck : c'est le paquet (l'ensemble des cartes)
* Card : c'est une carte

Dans cette version, nous introduisons les tests unitaires avec jest. Nous avons dû ajouter la gestion des imports.  
Voir le détail dans le paragraphe [gestion des modules](##la-gestion-des-modules).

## Les classes

### Card

Cette classe représente une carte à jouer.

#### Elle est composée d'attributs

* d'éléments du DOM pour afficher son image.
* de 2 valeurs :
  * un nombre et
  * une couleur
* indication si la carte est cachée ou retournée
* d'une url indiquant son image. Cette url est une propriété (attribut calculé).  

#### Elle a un comportement

* création du DOM : `createImage`. C'est là qu'est appelé l'événement `clic`.
* retourner la carte (face/dos <=> dos/face) : `returnTheCard`
* enlever la carte du tapis : `hideCard`
* click sur l'image : `onClick`

#### Image

L'affichage de l'image se fait grâce à l'empilement de 2 éléments du DOM : une `DIV` qui contient une `IMG`.  
J'ai fait le choix d'agrégation d'`HTMLElement`, à la place d'un héritage (cf MOO de UML).
Un héritage aurait demandé 2 classes, 1 pour la `DIV` et 1 pour l'`IMG`, et donc aurait complexifié le code.

### Deck

Cette classe gère l'ensemble des cartes (Card).  
Elle crée toutes les cartes dans un tableau (`initCards`) et affiche le paquet sur l'écran. Le clic est géré dans le constructeur.
Lors du clic, toutes les cartes sont mélangées et disposées sur le tapis (DOM).

### MemoryGame

C'est la classe qui gère le jeu. Elle contient un paquet (Deck).
Cette classe s'occupe de la mise en page (zonage) et des règles du jeu.  
C'est la classe maître.  
Voici les règles :

* une partie commence en cliquant sur la paquet, ceci a pour effet de placer les cartes sur le tapis.
* lorsque 2 cartes sont retournées
  * soit elles ont le même chiffre : elles disparaissent du tapis
  * soit le chiffre est différent : on les retourne sur la face cachée
* La partie se termine quand toutes les cartes ont disparues du tapis
* Il n'y a pas de relance d'une nouvelle partie.

## Création dynamique du DOM

Le DOM est un arbre. Ici notre arbre s'arrête au `BODY`, car notre index.html est presque vide.  
Donc pour créer dynamiquement du DOM, nous utilisons 2 méthodes :

* `appendChild`
* `createElement`  

`createElement` est une méthode de `document`. Elle crée un élément dans le DOM, sans le positionner dans l'arbre.  
`appendChild` est une méthode de Element. Elle attache un élément à un autre : elle ajoute un enfant au noeud.  
Exemple :

```typescript
    const section = document.createElement("section");
    section.className = "wrapper";
    this.aside = document.createElement("aside");
    this.aside.className = "deck";
    this.aside.id = "deck";
    section.appendChild(this.aside);
```

## Gestion du click en gardant la programmation objet

Prenons l'exemple de la classe Card.
Nous avons une méthode qui indique le comportement lors du clic

```typescript
    private onClick(): void {
        if (!this.isReturn && this.cardGame.numberOfReturnCard < 2) {
            this.returnTheCard();
            this.cardGame.controlThePair(this);
        }
    }
```

Pour gérer le `click`, nous utilisons l'écouteur `addEventListener`.  
Comme nous sommes en mode asynchrone, l'instance en cours (`this`) est perdue au moment de l'action click. Le `this` correspond à l'élément clické. Donc un `this.onClick` retourne une erreur.

```typescript
    // ceci retourne une erreur à l'exécution
    this.image.addEventListener("click", this.onClick(), false);
```

Il faut donc conserver le `this` de l'instance.  
Il existe une solution en conservant le `this` dans une autre variable, ou en faisant appel à une fonction avec le `this` en paramètre.  
Mais le moyen le plus simple c'est l'arrow function.

```typescript
    //arrow function résout le mode asynchrone
    this.image.addEventListener("click", () => {this.onClick(); }, false);
```

## La gestion des modules

Le code est dispatché dans plusieurs fichiers. Il faut donc gérer ces modules.  
La gestion des modules n'est pas normée en JS. Il faut utiliser des bibliothèque différentes selon l'environnement d'exécution :

* browser : asynchrone
* NodeJS : synchrone

De plus les solutions ne sont pas forcément compatibles. Par exemple, la gestion des module par Babel n'est pas la même que la solution prise par Typescript.  

La solution retenue est `AMD` et plus particulièrement `RequireJs`.
Cette gestion de module a le mérite d'être asynchrone et simple à implémenter.
Son défaut est la lenteur de chargement lorsque il y a trop de fichiers. Dans ce cas, la solution se trouve du côté `WebPack`.

### le module

Un module est borné par le fichier.
Tout élément précédé du mot clef `export` est un élément visible de l'extérieur.
Dans la plupart des cas, c'est la classe qui est exportée.
Seuls les éléments publics de la classe sont visibles.  
Nous avons l'export par défaut repéré par le mot clef `default`.  
Du côté de l'import, il suffit de faire un import du fichier (VSCode fait très bien cela pour nous), et d'utiliser la classe voulue.  

#### export

```typescript
/** MemoryGame.ts*/
export class MemoryGame {
...
}
```

#### import

```typescript
/** MemoryGame.spec.ts */
import { MemoryGame } from "../src/MemoryGame";
```

### L'appel dynamique

La transpilation Typescript va générer un fichier js par fichier ts (un par module/classe).  
On ne va pas déclarer chaque fichier dans la page HTML, on va faire appel RequireJS.  
L'appel va ce faire dynamiquement lors de l'exécution dans le browser.

#### RequireJS

##### configuration

On déclare dans la config la méthode AMD et l'implémentation requirejs :

tsconfig.json

```json
{
    "compilerOptions": {
        "module": "amd"
    }
}
```

package.json (ou `yarn add -D @types/requirejs requirejs`)

```json
{
    "devDependencies": {
        "@types/requirejs": "^2.1.31",
        "requirejs": "^2.3.6"
    }
 }
```

##### implementation

Création du fichier `main.ts`. C'est lui qui instancie la partie.

```typescript
/**
 * main.ts
 */
import {MemoryGame as Game} from "./MemoryGame";


export function start() {
    const game: Game = new Game();
    game.start();
}
```

Création du fichier `config.ts`. Config appelle le main.  

```typescript
/**
 *  config.ts
 */
requirejs(["main"], (app: any) => {app.start(); } );
```

Appel de requirejs dans `index.html`. Vous remarquez `data-main` qui référence le fichier config.js résultat de la compilation dans le dossier build.

```html
<head>
  <script data-main="build/config" src="node_modules/requirejs/require.js"></script>
</head>
```

## Les interfaces

Les interfaces ajoutent de l'agilité dans le code donc dans le refactoring.  

### Implémentation

#### Un exemple d'interface pour la classe Card

```typescript
/** Interface ICard.ts*/
export interface ICard {
    div: HTMLDivElement;
    image: HTMLImageElement;
    value: number;
    createImage(order: number): void;
    returnTheCard(): void;
    hideCard(): void;
}

/** Classe Card.ts*/
export class Card implements ICard {
    public div: HTMLDivElement;
    public image: HTMLImageElement;
    public value: number;

    public createImage(order: number): void {
        ...
    }
    ...
}

/** appel dans MemoryGame.ts*/
private removeThePair(card: ICard): void {
   ...
}

/** Instanciation dans Deck.ts*/
const card: ICard = new Card(this.cardGame, color, value);
```

#### Explications

ICard ne contient comme code que les propriétés et le comportement de la classe, et en aucun cas le comment.  
Le comment est écrit dans la classe.

1. vous écrivez l'interface en décrivant les propriétés et les méthodes visibles de l'extérieur
1. vous écrivez votre classe avec les propriétés et méthodes exigées par l'interface
1. partout où vous appelez votre classe habituellement, vous mettez l'interface
1. seule l'instanciation référence la classe et l'interface.

### Refactoring

#### Sans interface

Sans interface, vous auriez créé une classe et écrit beaucoup d'appels à cette classe (Card). Vous avez 2 solutions :

1. S'il y a peu de réécriture, vous modifiez la classe et donc conserver Card
1. S'il y a une réécriture complète de la classe, vous devez créer une nouvelle classe (PlayCard par exemple).

C'est ce second cas qui pose problème, car il demande des modifications dans tout votre code et donc amplifient les risques de régression.  
C'est là qu'intervient l'interface.

#### Avec interface

Vous écrivez du nouveau code dans une nouvelle classe (PlayCard par exemple).
Ceci permet de conserver Card le temps du dev et donc d'avoir une application livrable.
Vous faites de nouveaux tests unitaires sur cette nouvelle classe.  
Quand l'écriture de la classe est finie, vous faites le branchement de cette classe lors des instanciations (le new) et c'est tout.  
Le risque de regression est diminué, il y a moins de conflits dans git.  

### La Factory (ou sur les traces de l'Injection de dépendance (DI))

Ici, nous ajoutons une petite fonctionnalité : stocker le meilleur score (le moins de cartes retournées).
Lors du prochain lancement, on affichera ce score.  
Pour cela nous sauvegardons le résultat dans le local storage.
Or, le local storage n'est pas supporté par tous les browser.  
Dans un premier, j'avais écrit du code dans une classe avec plein de tests.
J'avais tort. C'est un cas de polymorphisme par interface.
Il faut deux classes : une pour le local storage et une pour un stockage par défaut.
Et donc une interface pour utiliser l'une ou l'autre.
Reste le test pour connaître quelle classe à instancier. On ne le met pas dans la classe appelante.
C'est une fonctionnalité technique (pas de métier).
Cette classe dédiée, c'est une fabrique d'instance : une **Factory**.

L'appel à la Factory se fait par cet appel.

```typescript
    let storage: IStorage;
    storage = FactoryStorage.createStorage();
```

Je vous demande d'aller directement lire le code dans les fichiers suivants :

* FactoryStorage.ts : c'est la factory
* LocalStorage.ts : c'est stockage des infos dans le local storage.
* MemoryStorage.ts : c'est un stockage en mémoire, donc pas de sauvegarde
Vous vous sentez d'attaque pour créer un stockage dans un cookie ?

## Le decorator

Le decorator est une annotation. Il permet d'écrire des instructions de méta-langage. Derrière un decorator se cache une fonction.  
C'est ce qui a été fait ici avec le decorator @Debug.
@Debug a pour but de tracer l'appel d'une méthode :

* l'instance
* le nom de la méthode
* les paramètres en entrée
* le résultat
C'est un code écrit pour le plaisir. Il demande à être améliorer.

Voici l'appel :

```typescript
    @Debug()
    public controlThePair(card: ICard): void {
        ...
    }
```

Le code de Debug est dans le fichier Debug.ts.
