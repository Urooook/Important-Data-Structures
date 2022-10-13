import {IDynamicVectorArrayObject} from "./interface";

export default class DynamicVectorArray<T> implements IDynamicVectorArrayObject<T>{
    #capacity: number;
    #length: number;
    #buffer: T[];

    get length() {
        return this.#length;
    }

    constructor(cap: number) {
        this.#capacity = cap;
        this.#length = 0;
        this.#buffer = new Array(cap);
    }

    public add(item: T): void {
        if(this.#capacity === this.length){
            this.updateArraySize();
        }
        this.#buffer[this.length] = item;
        this.#length++;
    }

    public remove(index: number): T {
        const deleteItem = this.#buffer[index];
        this.#buffer[index] = undefined;
        for(let i = index; i < this.length; i++){
            this.#buffer[i] = this.#buffer[i + 1]
        }
        this.#length--;
        return deleteItem;
    }

     public  get(index: number): T {
        return this.#buffer[index];
     }

    private updateArraySize(){
        this.#capacity = this.#capacity * 2;
        const newBuffer = new Array(this.#capacity);
        for(let i = 0; i<this.length; i++) {
            newBuffer[i] = this.#buffer[i]
        }
        this.#buffer = newBuffer;
    }

    get values() {
        let current = this.#buffer;
        return {
            * [Symbol.iterator]() {
                for (let i = 0; i < current.length; i++) {
                    yield current[i]
                }
            }
        }
    }
}