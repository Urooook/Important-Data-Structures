import {IListNode} from "./interface";

export default class ListNode<T> implements IListNode<T> {
    public data: T;
    public next: IListNode<T> | null = null;
    public prev: IListNode<T> | null = null;

    constructor(data: T) {
        this.data = data;
    }
}