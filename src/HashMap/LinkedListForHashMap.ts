import LinkedList from "../DynamicArray/LinkedList/LinkedList";
import ListNode from "../DynamicArray/LinkedList/ListNode";
import {ILinkedListForHashMapObj, KeyType} from "./interface";

export default class LinkedListForHashMap<T = unknown> extends LinkedList<T> implements ILinkedListForHashMapObj<T>{
    public insert(item: ListNode<T>): void {
        let prev = null;
        let current = this.first;
        let isUpdated = false

        while (current !== null){
            if(current.data[0] === item.data[0]){
                current.data[1] = item.data[1]
                isUpdated = true
                break;
            }
            prev = current;
            current = current.next;
        }

        if(!isUpdated){
            if(prev === null){
                this.first = item;
            } else {
                prev.next = item;
            }
            item.next = current;
        }
    }

    public find(key: KeyType): ListNode<T> {
        let current = this.first;
        while(current !== null) {
            if(current.data[0] === key) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
}