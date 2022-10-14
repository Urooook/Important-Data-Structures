import ListNode from "../DynamicArray/LinkedList/ListNode";
import LinkedListForHashMap from "./LinkedListForHashMap";
import { KeyType } from "./interface";

export default class HashMap {
    #hashArray: LinkedListForHashMap[];
    #arraySize: number;

    constructor(size: number) {
        this.#arraySize = size;
        this.#hashArray = new Array(this.#arraySize);
        for (let i = 0; i < this.#arraySize; i++) {
            this.#hashArray[i] = new LinkedListForHashMap();
        }
    }

    public displayTable() {
        for (let i = 0; i < this.#arraySize; i++) {
            this.#hashArray[i].displayListForward();
        }
    }

    public hashFunction(key: KeyType): number {
        key = String(key);
        let hashVal = 0;
        for (let i = 0; i < key.length; i++) {
            let letter = key.charCodeAt(0);
            hashVal = (hashVal * 27 + letter) % this.#arraySize;
        }
        return hashVal;
    }

    public set(key: KeyType, value: KeyType): void {
        const item = new ListNode<[key: KeyType, value: KeyType]>([key, value])
        const hashVal = this.hashFunction(key);
        this.#hashArray[hashVal].insert(item);
    }

    public get(key: KeyType): KeyType {
        const hashVal = this.hashFunction(key);
        const searchItem = this.#hashArray[hashVal];
        if (searchItem.first) {
            const value = searchItem.find(key).data[1];
            return value;
        } else {
            throw new Error('Элемента с таким ключом нет(')
        }
    }

    public keys(): Iterable<LinkedListForHashMap<unknown>> {
        const self = this;
        return {
            * [Symbol.iterator](): Iterator<LinkedListForHashMap<unknown>> {
                for (let i = 0; i < self.#arraySize; i++) {
                    let current = self.#hashArray[i].first;
                    while (current) {
                        yield current.data[0];
                        current = current.next
                    }

                }
            }
        }
    }
}