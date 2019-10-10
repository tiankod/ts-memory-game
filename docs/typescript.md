# Quelques notes à l'attention des développeurs Typescript débutants

## Version

Ces notes se basent sur Typescript 2.6

## Sur-ensemble

Typescript est un langage améliorant la production de code Javascript. C'est un sur-ensemble du Javascript.  
Il suffit de renommer un fichier .js en .ts pour en faire du Typescript.  
Cela signifie que vous pouvez écrire du Javascript dans du Typescript. Gardez cela en tête lorsque vous faites des recherches sur internet. Vous recherchez une solution à votre problématique, et ne trouvez rien, car Typescript est un jeune langage. La solution se trouve sûrement écrite en Javascript.  

## Nouveautés

Typescript apporte beaucoup de nouveaux concepts, surtout pour des développeurs ES5.  
Des concepts très utiles :

* le typage
* les interfaces
* les décorateurs.  

Ce sont des concepts très puissants venants du monde de l'objet. Appréhendez les progressivement.  

## Transpilation

Ni les navigateurs, ni Nodejs ne comprennent Typescript. Il faut donc transformer le code Typescript en Javascript.  
C'est la transpilation. A ne pas confondre avec la compilation qui génère du code binaire.  
Cependant par soucis de simplification, nous parlerons souvent de compilation.  
N'oubliez pas de transpiler vos sources avant de les exécuter.  
Si vous Mettez le transpilateur (tsc) en mode watch (tsc -w), vous êtes sûr d'avoir un exécutable à jour.  
Les options de transpilation sont décrites dans le fichier tsconfig.json.  
Pour transpiler :

* tsc nomFichier.ts
* tsc (si vous avez un fichier tsconfig.json)
* tsc -w (watch)

## Environnement de Développement

### EDI

Je vous conseille l'éditeur VS Code. C'est un éditeur de code qui devient un véritable EDI avec ses extensions.  
Par défaut, VS Code contient un environnement Typescript (normal c'est Microsoft).  
A cela, ajoutez les extensions suivantes :

* open in browser
* Typescript Extension Pack
* Debugger for chrome
* les extensions de git
  * gitLens
  * git History
  * git History Diff
  * git Graph

### Configuration

* `tslint.json` : ajout du no-console, si vous faites des console.log
* `tsconfig.json` : options de compilation du langage. Reprendre celui du projet en cours. Modifier les paramètres selon besoin.
* `package.json` : paramètres du projet. Voir § suivant
* `.vscode/setting.json` : paramètre de l'éditeur
* `.vscode/launch.json` : lancement automatique. Voir § suivant.

## Structure du projet

Il est préférable de structurer son projet en dossier :

* les fichiers de config dans la racine
* les sources dans le dossier src
* le Javascript transpilé dans le dossier build

### Package

Le `package.json` vient du monde NodeJS. il contient la description du projet et toutes ses dépendances.
Pour les installer, faites `npm install`.  
Les fichiers sont téléchargés dans le dossier node_modules.  

### Launch

Dans `launch.json`, vous pouvez mettre autant de configurations de démarrage que vous voulez.  
Vous y accéder ensuite par le menu Déboguer (ou F5).  
Launch permet le lancement d'un serveur http, un projet NodeJs, un fichier html.  
Dans notre projet, grace à l'extension _Debugger for Chrome_ nous lançons le fichier index.html. Celui ci s'affiche dans le browser Chrome.
S'il y a un point d'arrêt, le debugger mais en pause le process.
Il est alors possible d'avancer pas à pas, d'inspecter les variables, la pile d'appel, etc...  
Et tout cela dans VS Code !!!

## A l'attention des développeurs venant du monde Java

### typage

Le typage n'est pas obligatoire. En JS, il n'existe pas.  
En Typescript, il est **fortement recommandé** de le mettre. Il vous sauvera de nombreuses heures de débogage.  
Là où il n'est pas obligatoire de typer, c'est lors d'une déclaration de variable avec une affectation. 
C'est l'inférence de type (implémentée en Java 10 - var).  

### classe

Typescript est conçu pour des développeurs objet. Vous aurez moins d'effort à fournir en écrivant du Typescript, qu'en écrivant du ES5. La façon de programmer reste la même : utilisation de classes et d'interfaces.  

### fonction

En typescript, cohabite l'objet et le procédural. Ainsi vous pouvez utiliser les fonctions (contrairement à Java).

### primitive

Les number, boolean, string correspondent aux primitifs de Java et se comportent comme tel. Le passage de paramètre d'une méthode se fait par valeur (input), donc si vous voulez une valeur de retour, passez par un objet.

### visibilité

Comme en Java, abuser de la visibilité des attributs et méthodes.  
Il existe 3 visibilités : `public`, `protected`, `private`.  
Contrairement à Java, `protected` limite la porté aux enfants (pas au package).  
Comme en Java, ne mettez en public que ce qui est nécessaire. C'est l'encapsulation.

### attribut, propriété

En Java, ces 2 notions sont liées. En Typescript, ce sont 2 notions distinctes.  

#### attribut

Un attribut est une variable propre à l'objet.  

```Typescript
    // declaration
    private score: number;

    //utilisation
    this.score;
```

#### propriété

La propriété est une valeur calculée.  
Pour cela nous utilisons les mots clefs `get` et `set`, et une méthode.  
Exemple de getter/setter :

```Typescript
    // declaration
    public get highScore(): number {
        let score: number;
        score = this.getItemNum("highScore");
        if (score === 0) {
            score = Number.MAX_VALUE;
        }
        return score;
    }
    public set highScore(value: number) {
        this.setItemNum("highScore", value);
    }

    // utilisation
    this.highScore;
```

### accesseur

L'encapsulation si chère aux développeurs Java n'est pas aussi stricte.  
Par convention, on ne déclare pas de getter/setter sur les attributs. On y accède directement. Les accesseurs servent uniquement pour les propriétés.

### interface

En Typescript, l'interface contient des attributs. En Java, une interface ne contient pas d'attribut.  

### un fichier par classe

Non. Un fichier peut contenir plusieurs classes, interfaces, function.  

### package

La notion de package n'existe pas, il existe une notion de module et de namespace. Préférez le module.  

### programmation fonctionnelle

Une notion arrivée tardivement en Java est l'expression lambda. Elle se traduit ici par l'Arrow function (=>). C'est une fonction anonyme venant du JS. Très usitée et fort pratique en Javascript, elle permet de réduire le nombre de ligne de codes pour le même résultat.  

### callback

Javascript est un langage événementiel, qui ne connaît pas les thread (traitement en parallèle). Le code s'exécute linéairement sans possibilité d'attendre.  
Comment faire lors d'un traitement asynchrone (click, appel au serveur, ...) ?  
JS a résolu le problème en inventant la fonction callback. Cette fonction est appelée au retour de la réponse. Le callback est passée en paramètre de la fonction asynchrone.  

```Typescript
element.addEventListener("click", foo, false);
function foo() {
   ...
}
```

Note : le callback laisse progressivement la place aux promesses, voir aux Observable.  

### this

Comme en Java, `this` correspond à l'instance en cours, et `super` fait référence à la classe mère.  
Cependant, avec le callback, JS perd la valeur du this. Comme il s'agit d'un langage interprété à l'exécution, l'erreur n'apparaît qu'en exécution. Pour palier à cette erreur, nous utilisons une arrow function.

```Typescript
    // public method
    public foo(): void {
        //arrow function call onClick method
        element.addEventListener("click", () => {this.onClick(); }, false);
    }

    private onClick(): void {
        ...
    }
```

## Le namespace

Le `namespace` est fondamental pour éviter le conflit de nommage. Un fichier peut contenir plusieurs namespace, et un namespace peut être dans plusieurs fichiers. On voit que cela peut vite se compliquer.  
Dans un premier temps, je préconise de mettre cette notion de côté. Elle servira dans les gros projet.  
A partir du moment où vous mettez tout votre code dans une classe, le seul conflit de nommage qu'il risque d'avoir est le nom de la classe.

## Les modules

La gestion des modules en Typescript (comme en Javascript) est en pleine évolution. Elle commence tout juste à devenir simple grâce à l'ES6.  
Nous avons besoin d'un module lorsque l'on appelle du code écrit dans un autre fichier.

### écriture

Écrire tous le code dans une classe ou interface et faire un export de cette classe/interface. Dans le code appelant, faire un import du fichier.  
Module  

```Typescript
    /** fichier Deck.ts*/
    export default class Deck { ... }
```

Appel du module

```Typescript
    /** fichier Game.ts*/
    import { Deck } from "./Deck";
    class Game {
        private deck: Deck;
        ...
        this.deck = new Deck(this);
        this.deck.initCards();
        ...
    }
```

### export default (ou pas)

Si un module exporte un nom par défaut, c'est ce nom qui fera référence.  
S'il y a plusieurs exports, mettre les noms entre crochets `{ }`.  
Plus d'infos sur [Typescriptlang.org](https://www.Typescriptlang.org/docs/handbook/modules.html)

### export de fonction, variable  

Il est possible de faire des exports de fonction et de variables.  

### module : génération du code Javascript

Il existe plusieurs méthodes en Javascript pour gérer les modules.
Dans un projet il faut en choisir une.  
Pour une application dans un browser, on utilisera la librairie `requireJS` qui est asynchrone.  
Pour une une application serveur, on utilisera la librairie `SystemJS`.  
Pourquoi aborder ce sujet puisque l'on est en Typescript ? Tout simplement parce que l'on génère du Javascript et que le fichier html va appeler du Javascript.  
Donc on configure l'application :

* dans tsconfig.json, `"module": "amd",`.
* dans package.json, `devDependencies": {"@types/requirejs": "^2.1.31", "requirejs": "^2.3.5"`

Puis on code :  
fichier config.ts  

```Typescript
requirejs(["main"], (app: any) => {app.start(); } );
```

fichier Main.ts

```Typescript
export function start() {
    // appel de la 1ere classe
    const game: CardGame = new CardGame();
    game.start();
}
```

index.html

```html

<head>
  <script data-main="build/config" src="node_modules/requirejs/require.js"></script>
</head>
```

## Référence de fichiers

Vous verrez dans certains projets/tutos l'indication `triple-slash` (`///`).
Cette indication est utilisée lorsque l'on fait  référence à un élément contenu dans un autre fichier.

```Typescript
/// <reference path="bidule.ts" />
```

Cette déclaration sert pour l'analyse syntaxique du code, et tend à disparaître.  
Il vaut mieux utiliser les import externes `import xxx from ./bibule.ts`.
Et pour les fichiers de typings, if faut déclarer le fichier dans tsconfig.json.

```json
{
  "files": [
    "typings/index.d.ts"
  ]
}
```

## Typings

Typescript est un langage typé, on associe un type à toute donnée.  
Comment cela ce passe t'il lorsque Typescript communique avec du code Javascript (non typé) ?  

1. Notez qu'il s'agit uniquement d'un problème d'analyse syntaxique (de grammaire), puisque que l'interprétation par le browser se fait en Javascript (non typé).
2. Donc il n'y a pas besoin de réécrire tout le code Javascript.  
3. Cependant, Typescript a besoin du typage.  
4. C'est là qu'intervient le fichier de typings `d.ts`. Il permet l'utilisation de la librairie JS comme si elle était écrite en Typescript.
5. S'il s'agit d'un package npm, ce fichier est fourni par la communauté Typescript.  
6. Si c'est vous qui avez écrit le code Javascript, vous devrez écrire un fichier `.d.ts`.  

### package de npm

Depuis Typescript 2.x, c'est npm qui se référence le typings des librairies.  
Donc quand vous référencez une librairie JS  dans votre projet (package.json), n'oubliez pas d'ajouter le fichier typings correspondant.

```json
  "devDependencies": {
    "@types/requirejs": "^2.1.31",
    "requirejs": "^2.3.5"
  }
```

Si vous ne trouvez pas le fichier de définition du package, rechercher le sur ce site [TypeSearch](http://microsoft.github.io/TypeSearch/).  
Le fichier de définition est importé dans le dossier `node_modules/@types`.
Le compilateur le prend automatiquement en compte (pas besoin de le référencer autre part).  

### librairie interne

Vous avez écrit votre propre librairie en Javascript. Vous devez donc écrire le fichier de définition. Ceci fera l'objet d'un autre tuto.  
Ensuite, vous importez ce dernier dans votre projet dans un dossier à vous (`typings` par exemple).
Vous allez indiquer au compilateur ce dossier.  
Soit en ajoutant une seule fois le dossier typings dans l'option compilerOptions

```json
{
  "compilerOptions": {
    "typeRoots": ["./typings"]
  }
}
```

Soit en ajoutant le fichier d.ts l'option files

```json
{
  "files": [
    "typings/monFichier.d.ts"
  ]
}
```

## map

Les fichiers sources map existe déjà en Javascript. En effet, les sources js sont souvent minifiées lors du déploiement. Ce qui n'est pas très lisible pour debugger.  
Pour faire le lien entre le fichier minifié et le source du développeur, nous utilisons un source map.  
En Typescript, nous avons la même problématique : le browser lit le code transpilé.
Les fichiers qui font le lien ont l'extension `js.map`.  
Pour les générer, c'est une option de tsconfig.json : `sourceMap`.

## Un code propre (Software craftsmanship)

Javascript est un langage épuré, créé à un moment où l'on en demandait peu aux UI du browser. La communauté a apporté plein de solutions pour améliorer l'écriture du code.  
Typescript s'est donné comme mission une réécriture propre du code Javascript sans casser l'existant.  
Quelques conseils pour produire du code propre et agile :

* Écrivez en Objet et donc pensez Objet
* Écrivez un maximum de code dans des classes et des interfaces.
* Typez tout votre code
  * il devient plus lisible (une tierce personne comprendra plus vite le code)
  * vous répondez en partie à la question "à quoi sert cette variable"
  * le typage évite de longue heures de débogage (foi de vieux dev)
* Écrivez peu de code dans les méthodes
* Nommer vos variables, attributs, méthodes explicitement
  * une variable, un attribut, une propriété est un mot commun
  * une méthode est un verbe ou un groupe verbal à l'infinitif
  * une description explicite limite les commentaires, car elle suffit à la compréhension du code
* n'utilisez plus les fonctions anonymes, mais les arrow function
* Limitez l'utilisation et l'empilage des arrow function : on perd en compréhension
* Séparez votre code dans plusieurs fichiers et utilisez les modules
* Utilisez les interfaces
  * une classe implémente une interface
  * Dans votre code, utiliser l'interface à la place de la classe
  * la classe est déclarée uniquement à l'instanciation
  * Ceci diminue la forte dépendance des classes
  * votre code est plus agile.

### Quelques idées reçues à détordre

#### le typage des variables me fait perdre du temps

Vous pensez perdre votre temps en typant les données. C'est le contraire qui se produit.  
Il est vrai lors de l'écriture du code, vous devez saisir plus de caractères, et surtout vous posez la question de l'utilité de la variable (ou paramètre, ou attribut). Vous reportez la décision au compilateur. C'est la machine qui décide pour vous (car la machine veut du typage). Et la machine est moins intelligente que vous, et c'est lors de l'exécution que l'erreur va se produire.  
Quand vous ne typez pas, vous allez au devant de bugs très longs à résoudre, donc une perte de temps.  
Deuxièmement, un code non typé est plus difficile à lire, d'autant plus si ce n'est pas vous qui avez écrit le code. Donc c'est encore une perte de temps.

#### La rigueur de l'Objet me rend moins agile

Le gros avantage de l'objet c'est la modularité et la réutilisation du code.  
Grâce aux injections de dépendance, il est possible de réécrire tout une classe sans modifier une seule ligne en dehors de cette classe. Si ce n'est pas être agile.  
Être agile, c'est avant tout être rigoureux, savoir découper un problème en portion. Tout ce que sait faire la programmation objet.

### Je perds ma liberté

Vous aimez les fonctions anonymes, les closures, les variables globales, le non typage.  
Oui tout cela est très bien pour de petits projets.  
Dès que cela grossit, cela devient moins évident. Ce n'est pas pour rien que Javascript évolue.  

* Les fonctions anonymes m'évitent de nommer le comportement, Je peux empiler des appels. C'est très bien pour du petit traitement. Est-ce que votre code est réutilisable autre part ? Non. Vous devrez le réécrire.
* Vous voulez limiter le scope d'une variable, déclarer la dans la classe. Fini les closures.
* Les variables globales. Beurk ! Quelle erreur. Combien d'heures perdues à comprendre un bug.
* Le non typage, je ne type pas parce que :
    1. je ne sais pas ce que fait ma variable => dommage
    2. je suis fainéant => c'est une qualité du dev. Mais là vous misez sur du code non bugger.
    3. c'est indiqué à l'initialisation => c'est du typage par inférence
    4. je veux l'utiliser plusieurs fois dans des contextes différents => utiliser des variables différentes
    5. elle a plusieurs comportements => utiliser `any`
    6. Ca m'oblige à trouver le bon type de la variable => c'est le but, quand cette question est résolue, plus personne ne se la pose. Si je ne sais, je mets `any`.  

En conclusion, vous ne perdez pas votre liberté. Vous échanger une liberté pour une autre encore plus grande.  

#### Je suis obligé de tout réécrire mon code

Non. Typescript est un sur-ensemble. Renommer votre fichier en .js .ts, et c'est fait, vous avez du code Typescript.  
Bien sur ce n'est pas génial. Réécrivez au fur et à mesure votre code, ou créez un fichier de déclaration de type (.d.ts).  
