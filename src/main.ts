/**
 * main.ts
 */
import {IMemoryGame as IGame} from "./IMemoryGame";
import {MemoryGame as Game} from "./MemoryGame";


export function start() {
    const game: IGame = new Game();
    game.start();
}
