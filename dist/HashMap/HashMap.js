"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HashMap_hashArray, _HashMap_arraySize;
Object.defineProperty(exports, "__esModule", { value: true });
const ListNode_1 = require("../DynamicArray/LinkedList/ListNode");
const LinkedListForHashMap_1 = require("./LinkedListForHashMap");
class HashMap {
    constructor(size) {
        _HashMap_hashArray.set(this, void 0);
        _HashMap_arraySize.set(this, void 0);
        __classPrivateFieldSet(this, _HashMap_arraySize, size, "f");
        __classPrivateFieldSet(this, _HashMap_hashArray, new Array(__classPrivateFieldGet(this, _HashMap_arraySize, "f")), "f");
        for (let i = 0; i < __classPrivateFieldGet(this, _HashMap_arraySize, "f"); i++) {
            __classPrivateFieldGet(this, _HashMap_hashArray, "f")[i] = new LinkedListForHashMap_1.default();
        }
    }
    displayTable() {
        for (let i = 0; i < __classPrivateFieldGet(this, _HashMap_arraySize, "f"); i++) {
            __classPrivateFieldGet(this, _HashMap_hashArray, "f")[i].displayListForward();
        }
    }
    hashFunction(key) {
        key = String(key);
        let hashVal = 0;
        for (let i = 0; i < key.length; i++) {
            let letter = key.charCodeAt(0);
            hashVal = (hashVal * 27 + letter) % __classPrivateFieldGet(this, _HashMap_arraySize, "f");
        }
        return hashVal;
    }
    set(key, value) {
        const item = new ListNode_1.default([key, value]);
        const hashVal = this.hashFunction(key);
        __classPrivateFieldGet(this, _HashMap_hashArray, "f")[hashVal].insert(item);
    }
    get(key) {
        const hashVal = this.hashFunction(key);
        const searchItem = __classPrivateFieldGet(this, _HashMap_hashArray, "f")[hashVal];
        if (searchItem.first) {
            const value = searchItem.find(key).data[1];
            return value;
        }
        else {
            throw new Error('Элемента с таким ключом нет(');
        }
    }
    keys() {
        const self = this;
        return {
            *[Symbol.iterator]() {
                for (let i = 0; i < __classPrivateFieldGet(self, _HashMap_arraySize, "f"); i++) {
                    let current = __classPrivateFieldGet(self, _HashMap_hashArray, "f")[i].first;
                    while (current) {
                        yield current.data[0];
                        current = current.next;
                    }
                }
            }
        };
    }
}
exports.default = HashMap;
_HashMap_hashArray = new WeakMap(), _HashMap_arraySize = new WeakMap();
