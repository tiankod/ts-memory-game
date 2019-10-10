/**
 * this solution use 3 class in the same file
 * MemoryGame
 * Deck
 * Card
 */

window.onload = () => {
    const game: MemoryGame = new MemoryGame();
    game.start();
}

// new type H or C for Heart and Clover
type CardColor = "H" | "C";

class MemoryGame {

    private static DELAI: number = 1000;
    public numberOfReturnCard: number;
    public aside: HTMLElement;
    public carpet: HTMLElement;
    private deck: Deck;
    private lastReturnCard: Card;

    constructor() {
        this.numberOfReturnCard = 0;
    }
    /**
     * begin of game
     */
     public start() {
        const header: HTMLElement = this.createHeader();
        const gameTable: HTMLElement = this.createGameTable();
        document.body.appendChild(header);
        document.body.appendChild(gameTable);
        this.createNewDeck();
    }
    /**
     * actions when a card is return
     */
    public controlThePair(card: Card): void {
        // only one return card
        if ((this.lastReturnCard === undefined) || (this.lastReturnCard == null)) {
            this.lastReturnCard = card;
        } else {
        // two return cards
            // the cards are differents
            if (card.value !== this.lastReturnCard.value) {
                setTimeout(() => {
                    card.returnTheCard();
                    this.lastReturnCard.returnTheCard();
                    this.lastReturnCard = null; } , MemoryGame.DELAI);
            // the same cards
            } else {
                setTimeout(() => {
                    this.removeThePair(card); } , MemoryGame.DELAI);
            }
        }
    }
    /**
     * the pack is the total number of cards before starting the game
     */
    private createNewDeck(): void {
        this.deck = new Deck(this);
        this.deck.initCards();
    }
    /**
     * take off the same cards
     */
    private removeThePair(card: Card): void {
        card.hideCard();
        this.lastReturnCard.hideCard();
        this.lastReturnCard = null;
        this.numberOfReturnCard = 0;
        this.deck.numberOfPair--;
    }
    /**
     * create dynamic header of UI
     */
    private createHeader(): HTMLElement {
        const header: HTMLElement = document.createElement("header");
        const title1: HTMLElement = document.createElement("h1");
        header.appendChild(title1);
        title1.innerHTML = "Memory Game";
        title1.className = "title1";
        return header;
    }
    /**
     * create dynamic body of UI : pack + carpet
     */
    private createGameTable(): HTMLElement {
        const section = document.createElement("section");
        section.className = "wrapper";
        // pack
        this.aside = document.createElement("aside");
        this.aside.className = "pack";
        this.aside.id = "pack";
        // carpet
        this.carpet = document.createElement("article");
        this.carpet.className = "carpet";
        this.carpet.id = "carpet";
        section.appendChild(this.aside);
        section.appendChild(this.carpet);
        return section;
    }
}

class Deck {
    private static readonly MAX_PAIR: number = 8; // constant in class
    private static readonly listColor: CardColor[] = ["H", "C"];

    public cards: Card[];
    public numberOfPair: number;
    private cardGame: MemoryGame;
    private cardImg: HTMLElement;
    private carpet: HTMLElement;

    constructor(cardGame: MemoryGame) {
        this.cardGame = cardGame;
        this.cardImg = this.cardGame.aside;
        this.carpet = this.cardGame.carpet;
        this.cardImg.addEventListener("click", () => {this.onClick(); }, false); // Arrow function
    }
    /**
     * generate the card of game
     */
    public initCards(): void {
        let order: number = 0;
        let color: CardColor;

        this.numberOfPair = Deck.MAX_PAIR;
        // show le back of the pack
        const img: HTMLImageElement = document.createElement("img");
        img.className = "packImg";
        img.src = "images/back.png";
        img.alt = "stock";
        this.cardImg.appendChild(img);

        // list of cards
        this.cards = new Array();
        // for all color - for each with for
        for (color of Deck.listColor) {
            for (let value = 1; value <= Deck.MAX_PAIR; value++ ) {
                const card: Card = new Card(this.cardGame, color, value);
                card.createImage(order);
                this.cards[order] = card;
                order++;
            }
        }
    }

    /**
     * begin of the round
     */
    private onClick(): void {
        this.putCardsOnCarpet();
        // suppress the back of pack card
        while (this.cardImg.firstChild) {
            this.cardImg.removeChild(this.cardImg.firstChild);
        }
    }

    /**
     * put the cards in the carpet
     */
    private putCardsOnCarpet(): void {
        // random shuffle
        this.cards.sort(() => 0.5 - Math.random());
        // put all cards on the carpet - for each with arrow function
        this.cards.forEach((c) => this.carpet.appendChild(c.div));
    }
}

class Card {
    private static readonly BACK_IMAGE: string = "images/back.png";

    public div: HTMLDivElement;
    public image: HTMLImageElement;
    public value: number;
    private cardGame: MemoryGame;
    private color: CardColor;
    private isReturn: boolean;

    constructor(cardGame: MemoryGame, color: CardColor, value: number) {
        this.cardGame = cardGame;
        this.color = color;
        this.value = value;
        this.isReturn = false;
    }
    /**
     * create image
     */
    public createImage(order: number): void {
        order++;
        this.div = document.createElement("div");
        this.div.id = `card ${order}`;
        this.image = document.createElement("img");
        this.image.src = Card.BACK_IMAGE;
        this.image.alt = `card ${order}`;
        this.div.appendChild(this.image);
        // arrow function for click event (I love Arrow function)
        this.image.addEventListener("click", () => {this.onClick(); }, false);
    }
    /**
     * visual effect when a card is return
     */
    public returnTheCard(): void {
        if (this.isReturn) {
            this.image.src = Card.BACK_IMAGE;
            this.isReturn = false;
            this.cardGame.numberOfReturnCard--;
        } else {
            this.image.src = this.srcImage;
            this.isReturn = true;
            this.cardGame.numberOfReturnCard++;
        }
    }
    /**
     * take off a card
     */
    public hideCard(): void {
        while (this.div.firstChild) {
            this.div.removeChild(this.div.firstChild);
        }
    }
    /**
     * when you click on the card
     */
    private onClick(): void {
        if (!this.isReturn && this.cardGame.numberOfReturnCard < 2) {
            this.returnTheCard();
            this.cardGame.controlThePair(this);
        }
    }

    // this is a property (getter)
    private get srcImage(): string {
        return `images/${this.value}${this.color}.png`;
    }
}
