# Document technique

Ce document explique les choix de développement de cette solution.

## environnement de travail

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

## Un seul fichier ts

Dans un premier temps, nous ne gérons pas les modules. Ainsi tout le code est écrit dans un même fichier.

## Lancement du code

Le choix est de partir de suite sur une programmation objet.
Dans index.html, appel du javascript compilé build/MemoryGame.js

```html
<script src="./build/MemoryGame.js"></script>
```  

Dans le fichier Typescript, lancement du traitement par un window.onload

```Typescript
window.onload = () => {
    const game: MemoryGame = new MemoryGame();
    game.start();
}
```

## Découpage

Découpage du code en 3 classes :

* MemoryGame : c'est le jeu
* Deck : c'est le paquet (l'ensemble des cartes)
* Card : c'est une carte

## Card

Cette classe représente une carte à jouer.

### Elle est composée d'attributs

* d'éléments du DOM pour afficher son image.
* de 2 valeurs :
  * un nombre et
  * une couleur
* indication si la carte est cachée ou retournée
* d'une url indiquant son image. Cette url est une propriété (attribut calculé).  

### Elle a un comportement

* création du DOM : `createImage`. C'est là qu'est appelé l'événement `clic`.
* retourner la carte (face/dos <=> dos/face) : `returnTheCard`
* enlever la carte du tapis : `hideCard`
* click sur l'image : `onClick`

### Image

L'affichage de l'image se fait grâce à l'empilement de 2 éléments du DOM : une `DIV` qui contient une `IMG`.  
J'ai fait le choix d'agrégation d'`HTMLElement`, à la place d'un héritage (cf MOO de UML).
Un héritage aurait demandé 2 classes, 1 pour la `DIV` et 1 pour l'`IMG`, et donc aurait complexifié le code.

## Deck

Cette classe gère l'ensemble des cartes (Card).  
Elle crée toutes les cartes dans un tableau (`initCards`) et affiche le paquet sur l'écran. Le clic est géré dans le constructeur.
Lors du clic, toutes les cartes sont mélangées et disposées sur le tapis (DOM).

## MemoryGame

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
