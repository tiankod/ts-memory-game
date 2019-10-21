import { IMemoryGame } from "./IMemoryGame";
import { ICard } from "./ICard";
import { IDeck } from "./IDeck";
import { Deck } from "./Deck";
import { IStorage } from "./IStorage";
import { FactoryStorage } from "./FactoryStorage";

/**
 * this solution use 3 dependant class in the same file
 * MemoryGame
 * Deck
 * Card
 */

export class MemoryGame implements IMemoryGame{

    private static TIME_LIMIT: number = 1000;
    public numberOfReturnCard: number;
    public aside: HTMLElement;
    public tableGame: HTMLElement;
    public deck: IDeck;
    private lastReturnCard: ICard;
    public score: number;
    private scoreTxt: HTMLElement;
    private highScoreTxt: HTMLElement;
    private storage: IStorage;

    constructor() {
        this.numberOfReturnCard = 0;
        this.score = 0;
        this.storage = FactoryStorage.createStorage();
    }
    /**
     * begin of game
     */
    public start() {
        const header: HTMLElement = this.createHeader();
        const roomGame: HTMLElement = this.createRoomGame();
        document.body.appendChild(header);
        document.body.appendChild(roomGame);
        this.createNewDeck();
    }
    /**
     * actions when a card is return
     */
    public controlThePair(card: ICard): void {
        // only one return card
        if ((this.lastReturnCard === undefined) || (this.lastReturnCard == null)) {
            this.lastReturnCard = card;
        } else {
            // two return cards
            // the cards are different
            if (card.value !== this.lastReturnCard.value) {
                setTimeout(() => {
                    card.returnTheCard();
                    this.lastReturnCard.returnTheCard();
                    this.lastReturnCard = null;
                }, MemoryGame.TIME_LIMIT);
                // the same cards
            } else {
                setTimeout(() => {
                    this.removeThePair(card);
                }, MemoryGame.TIME_LIMIT);
            }
        }
    }
    /**
     * the deck is the total number of cards before starting the game
     */
    public createNewDeck(): void {
        this.deck = new Deck(this);
        this.deck.initCards();
        this.score = -1;
        this.incrementTheScore();
    }
    /**
     * the score is the number of click
     */
    public incrementTheScore(): void {
        // show the score with a template literal
        this.score++;
        this.scoreTxt.innerHTML = `Score : ${this.score}`;
    }
    /**
         * take off the same cards
         */
    private removeThePair(card: ICard): void {
        card.hideCard();
        this.lastReturnCard.hideCard();
        this.lastReturnCard = null;
        this.numberOfReturnCard = 0;
        this.deck.numberOfPair--;
        if (this.deck.numberOfPair < 1) {
            this.thisIsTheEndOfGame();
        }
    }
    /**
     * then end of the game
     * you show the score and start a new round
     */
    private thisIsTheEndOfGame(): void {
        if (this.storage.highScore > this.score) {
            this.storage.highScore = this.score;
            this.highScoreTxt.innerHTML = `High score : ${this.storage.highScore}`;
        }
        this.createNewDeck();
    }
    /**
     * create dynamic header of UI
     */
    private createHeader(): HTMLElement {
        const header: HTMLElement = document.createElement("header");
        const title1: HTMLElement = document.createElement("h1");
        this.highScoreTxt = document.createElement("p");
        this.scoreTxt = document.createElement("p");
        header.appendChild(title1);
        header.appendChild(this.highScoreTxt);
        header.appendChild(this.scoreTxt);
        title1.innerHTML = "Memory Game";
        title1.className = "title1";
        this.highScoreTxt.className = "title2";
        this.highScoreTxt.innerHTML = (this.storage.highScore !== Number.MAX_VALUE)
            ? `High score : ${this.storage.highScore}`
            : `High score : `;
        this.scoreTxt.className = "title3";
        return header;
    }
    /**
     * create dynamic body of UI : deck + tableGame
     */
    private createRoomGame(): HTMLElement {
        const section = document.createElement("section");
        section.className = "wrapper";
        // deck
        this.aside = document.createElement("aside");
        this.aside.className = "deck";
        this.aside.id = "deck";
        // tableGame
        this.tableGame = document.createElement("article");
        this.tableGame.className = "tableGame";
        this.tableGame.id = "tableGame";
        section.appendChild(this.aside);
        section.appendChild(this.tableGame);
        return section;
    }
}