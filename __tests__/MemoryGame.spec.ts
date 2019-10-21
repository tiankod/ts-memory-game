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
        expect(listImages.length).toEqual(1);
    });


    test('Click on desk ', () => {
        game.createNewDeck();
        game.deck.onClick();
        const listImages = document.querySelectorAll('img');

        expect(listImages.length).toEqual(16);
    });

    test('increment score', () => {
        let nextScore = game.score + 1;
        game.incrementTheScore();
        expect(game.score).toEqual(nextScore);
    });

});
