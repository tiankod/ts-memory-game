import { LocalStorage } from "./LocalStorage";
import { MemoryStorage } from "./MemoryStorage";
import { IStorage } from "./IStorage";

/**
 * this is the factory for storage
 * Factory is a design pattern use in OOP
 */

export class FactoryStorage {

    /**
     * create an instance of storage
     * if parameter isn't defined and allowed, we use LocalStorage
     * @param typeOfStorage : optional
     */
    public static createStorage(typeOfStorage?: string): IStorage {
        // parameter not defined
        if (!typeOfStorage) {
            if (LocalStorage.isAvailable()) {
                return FactoryStorage.createStorage("local");
            } else {
                return FactoryStorage.createStorage("memory");
            }
        // type of storage is known
        } else {
            if (typeOfStorage === "local") {
                return LocalStorage.getStorage();
            }
        }
        return MemoryStorage.getStorage();
    }
}
