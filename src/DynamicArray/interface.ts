import {ILinkedList} from "./LinkedList/interface";

export interface IDynamicArrayObject<T> {
    length: number
    itemArrayLength: number
    dynArr: ILinkedList<unknown>

    createNewLinkedListItem(item: T): void
    checkEmptyOrFillArray(): boolean
    add(item: T): void
    get(index: number): T
    remove(index: number): T
}