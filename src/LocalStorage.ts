/**
 * storage management
 */
export class LocalStorage {
    /**
     * test if browser support localStorage
     */
    public static isAvailable(): boolean {
        let availableStorage: boolean;
        try {
            window.localStorage.setItem("__storage_test__", "test");
            window.localStorage.removeItem("__storage_test__");
            availableStorage = true;
        } catch (e) {
            availableStorage = false;
        }
        return availableStorage;
    }
    /**
     * Singleton
     */
    public static getStorage(): LocalStorage {
        return LocalStorage.INSTANCE;
    }
    private static INSTANCE: LocalStorage = new LocalStorage();

    /**
     * storage in LocalStorage
     */
    public getItemNum(key: string): number {
        return Number(window.localStorage.getItem(key));
    }
    public setItemNum(key: string, value: number) {
        window.localStorage.setItem(key, value.toString());
    }
    /**
     * properties
     */
    public get highScore(): number {
        let score: number;
        score = this.getItemNum("highScore");
        if (score === 0) {
            score = Number.MAX_VALUE;
        }
        return score;
    }
    public set highScore(value: number) {
        this.setItemNum("highScore", value);
    }
}
