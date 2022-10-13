import LinkedList from "./LinkedList/LinkedList";
import {IDynamicArrayObject} from "./interface";

export default class DynamicArray<T = unknown> extends LinkedList implements IDynamicArrayObject<T>{
    #itemArrayLength: number;
    #length: number = 0;
    #dynArr = new LinkedList();

    constructor(arrL: number) {
        super();
        this.#itemArrayLength = arrL;
    }

    get length(): number{
        return this.#length
    }

    get itemArrayLength(): number {
        return this.#itemArrayLength
    }

    get dynArr(){
        return this.#dynArr;
    }

    public createNewLinkedListItem (item: T): void {
        const firstArr = new Array(this.#itemArrayLength);
        firstArr[0] = item
        this.#dynArr.add(firstArr)
    }

    public checkEmptyOrFillArray(): boolean {
        if(this.#dynArr.isEmpty()) return true;
        if(this.#length % this.#itemArrayLength === 0){
            for(let i = 0; i < this.#itemArrayLength; i++){
                if(this.#dynArr.last.data[i] === undefined){
                    return false;
                }
            }
        }
    }

    public add(item: T): void {
        if(this.checkEmptyOrFillArray()) {
           this.createNewLinkedListItem(item);
        } else{
            const searchItemOfLLIndex = Math.trunc(this.#length / this.#itemArrayLength);
            const searchItem = this.#dynArr.getItemByIndex(searchItemOfLLIndex);
            if(searchItem){
                for(let i = 0; i < this.#itemArrayLength; i++) {
                    if(!searchItem.data[i]) {
                        searchItem.data[i] = item;
                        this.#dynArr.changeItemDataByIndex(searchItemOfLLIndex, searchItem.data)
                        break;
                    }
                }
            } else {
                this.createNewLinkedListItem(item);
            }
        }
        this.#length++;
    }

    public get(index: number): T {
        const searchItemOfLLIndex = Math.trunc(index / this.#itemArrayLength);
        const searchItem = this.#dynArr.getItemByIndex(searchItemOfLLIndex);
        if(searchItem){
            return searchItem.data[index % this.#itemArrayLength];
        } else {
            throw new Error('Такого элемента нет(((')
        }
    }

    public remove(index: number): T {
        const searchItemOfLLIndex = Math.trunc(index / this.#itemArrayLength);
        const searchItem = this.#dynArr.getItemByIndex(searchItemOfLLIndex);
        const returnVal = searchItem.data[index % this.#itemArrayLength];

        let current = searchItem;
        while (current !== null) {
            for (let i = current === searchItem ? index % this.#itemArrayLength : 0; i < this.#itemArrayLength; i++) {
                current.data[i] = current.data[i + 1] || current.next?.data[0] || undefined;
            }
            current = current?.next || null;
        }
        this.#length--;
        return returnVal;
    }

    get values() {
        let current = this.#dynArr.first;
        const self = this;
        return {
            *[Symbol.iterator]() {
                while (current) {
                    for(let i=0; i< self.#length; i++){
                        if(current.data[i]){
                            yield current.data[i];
                        }
                    }
                    current = current.next
                }
            }
        }
    }
}

