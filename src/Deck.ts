import { IDeck } from "./IDeck";
import { ICard } from "./ICard";
import { Card } from "./Card";
import { IMemoryGame } from "./IMemoryGame";
import { CardColor } from "./CardColor";

export class Deck implements IDeck {
    public static readonly MAX_PAIR: number = 8; // constant in class
    private static readonly listColor: CardColor[] = ["H", "C"];
    public cards: ICard[];
    public numberOfPair: number;
    private cardGame: IMemoryGame;
    private cardImg: HTMLElement;
    private tableGame: HTMLElement;
    constructor(cardGame: IMemoryGame) {
        this.cardGame = cardGame;
        this.cardImg = this.cardGame.aside;
        this.tableGame = this.cardGame.tableGame;
        this.cardImg.addEventListener("click", () => { this.onClick(); }, false); // Arrow function
    }
    /**
     * generate the card of game
     */
    public initCards(): void {
        let order: number = 0;
        let color: CardColor;
        this.numberOfPair = Deck.MAX_PAIR;
        // show le back of the deck
        const img: HTMLImageElement = document.createElement("img");
        img.className = "deckImg";
        img.src = "images/back.png";
        img.alt = "stock";
        this.cardImg.appendChild(img);
        // list of cards
        this.cards = new Array();
        // for all color - for each with for
        for (color of Deck.listColor) {
            for (let value = 1; value <= Deck.MAX_PAIR; value++) {
                const card: ICard = new Card(this.cardGame, color, value);
                card.createImage(order);
                this.cards[order] = card;
                order++;
            }
        }
    }
    /**
     * begin of the round
     */
    public onClick(): void {
        this.putCardsOnTableGame();
        // suppress the back of deck card
        while (this.cardImg.firstChild) {
            this.cardImg.removeChild(this.cardImg.firstChild);
        }
    }
    /**
     * put the cards on the tableGame
     */
    private putCardsOnTableGame(): void {
        // random shuffle
        this.cards.sort(() => 0.5 - Math.random());
        // clear the table game
        while (this.tableGame.firstChild) {
            this.tableGame.removeChild(this.tableGame.firstChild);
        }
        // put all cards on the tableGame - for each with arrow function
        this.cards.forEach((c) => this.tableGame.appendChild(c.div));
    }
}
