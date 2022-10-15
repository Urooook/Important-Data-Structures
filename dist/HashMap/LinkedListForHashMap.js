"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LinkedList_1 = require("../DynamicArray/LinkedList/LinkedList");
class LinkedListForHashMap extends LinkedList_1.default {
    insert(item) {
        let prev = null;
        let current = this.first;
        let isUpdated = false;
        while (current !== null) {
            if (current.data[0] === item.data[0]) {
                current.data[1] = item.data[1];
                isUpdated = true;
                break;
            }
            prev = current;
            current = current.next;
        }
        if (!isUpdated) {
            if (prev === null) {
                this.first = item;
            }
            else {
                prev.next = item;
            }
            item.next = current;
        }
    }
    find(key) {
        let current = this.first;
        while (current !== null) {
            if (current.data[0] === key) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
}
exports.default = LinkedListForHashMap;
