import {ILinkedList} from "./LinkedList/interface";

export interface IDynamicArrayObject<T> {
    length: number
    itemArrayLength: number
    dynArr: ILinkedList<unknown>
}