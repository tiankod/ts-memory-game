/**
 * main.ts
 */
import {MemoryGame as Game} from "./MemoryGame";


export function start() {
    const game: Game = new Game();
    game.start();
}
