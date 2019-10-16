import { MemoryGame } from "../src/MemoryGame";

describe('init game', () => {
    const game: MemoryGame = new MemoryGame();

    beforeAll(() => {
        game.start();
    })

    test('game is creat', () => {
        expect(game).toBeDefined;
    });

    test('game has cards', () => {
        const listImages = document.querySelectorAll('img');
        
        console.log("nb="+listImages.length);
        

        expect(listImages.length).toEqual(1);
    });
    
});