import { ICard } from "./ICard";
import { IDeck } from "./IDeck";

export interface IMemoryGame {
    deck: IDeck;
    score: number;
    numberOfReturnCard: number;
    aside: HTMLElement;
    tableGame: HTMLElement;
    start(): void;
    controlThePair(card: ICard): void;
    incrementTheScore(): void;
    createNewDeck() : void;
}