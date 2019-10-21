/**
 * storage in memory
 */
export class MemoryStorage {
    /**
     * Singleton
     */
    public static getStorage(): MemoryStorage {
        return MemoryStorage.INSTANCE;
    }
    private static INSTANCE: MemoryStorage = new MemoryStorage();

    public highScore: number;
    constructor() {
        this.highScore = Number.MAX_VALUE;
    }
}
