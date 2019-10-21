import { IMemoryGame } from "./IMemoryGame";
import { CardColor } from "./CardColor";
import { ICard } from "./ICard";

export class Card implements ICard{
    private static readonly BACK_IMAGE: string = "images/back.png";
    public div: HTMLDivElement;
    public image: HTMLImageElement;
    public value: number;
    private cardGame: IMemoryGame;
    private color: CardColor;
    private isReturn: boolean;
    constructor(cardGame: IMemoryGame, color: CardColor, value: number) {
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
        this.image.addEventListener("click", () => { this.onClick(); }, false);
    }
    /**
     * visual effect when a card is return
     */
    public returnTheCard(): void {
        if (this.isReturn) {
            this.image.src = Card.BACK_IMAGE;
            this.isReturn = false;
            this.cardGame.numberOfReturnCard--;
        }
        else {
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
            this.cardGame.incrementTheScore();
            this.cardGame.controlThePair(this);
        }
    }
    // this is a property (getter)
    private get srcImage(): string {
        return `images/${this.value}${this.color}.png`;
    }
}
