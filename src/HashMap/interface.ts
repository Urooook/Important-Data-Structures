import ListNode from "../DynamicArray/LinkedList/ListNode";

export type KeyType = string | number;

export interface IHashMapObject {
    displayTable(): void
    hashFunction(key: KeyType)
    set(key: KeyType, value: KeyType): void
    get(key: KeyType): KeyType
}

export interface ILinkedListForHashMapObj<T = unknown> {
    insert(item: ListNode<T>): void
    find(key: KeyType): ListNode<T>
}