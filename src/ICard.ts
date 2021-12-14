/**
 * Interface for classe Card
 */
export interface ICard {
    div?: HTMLDivElement;
    image?: HTMLImageElement;
    value: number;
    createImage(order: number): void;
    returnTheCard(): void;
    hideCard(): void;
}
