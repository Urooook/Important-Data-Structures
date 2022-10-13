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
var _DynamicArray_itemArrayLength, _DynamicArray_length, _DynamicArray_dynArr;
Object.defineProperty(exports, "__esModule", { value: true });
const LinkedList_1 = require("./LinkedList/LinkedList");
class DynamicArray extends LinkedList_1.default {
    constructor(arrL) {
        super();
        _DynamicArray_itemArrayLength.set(this, void 0);
        _DynamicArray_length.set(this, 0);
        _DynamicArray_dynArr.set(this, new LinkedList_1.default());
        __classPrivateFieldSet(this, _DynamicArray_itemArrayLength, arrL, "f");
    }
    get length() {
        return __classPrivateFieldGet(this, _DynamicArray_length, "f");
    }
    get itemArrayLength() {
        return __classPrivateFieldGet(this, _DynamicArray_itemArrayLength, "f");
    }
    get dynArr() {
        return __classPrivateFieldGet(this, _DynamicArray_dynArr, "f");
    }
    createNewLinkedListItem(item) {
        const firstArr = new Array(__classPrivateFieldGet(this, _DynamicArray_itemArrayLength, "f"));
        firstArr[0] = item;
        __classPrivateFieldGet(this, _DynamicArray_dynArr, "f").add(firstArr);
    }
    checkEmptyOrFillArray() {
        if (__classPrivateFieldGet(this, _DynamicArray_dynArr, "f").isEmpty())
            return true;
        if (__classPrivateFieldGet(this, _DynamicArray_length, "f") % __classPrivateFieldGet(this, _DynamicArray_itemArrayLength, "f") === 0) {
            for (let i = 0; i < __classPrivateFieldGet(this, _DynamicArray_itemArrayLength, "f"); i++) {
                if (__classPrivateFieldGet(this, _DynamicArray_dynArr, "f").last.data[i] === undefined) {
                    return false;
                }
            }
        }
    }
    add(item) {
        var _a;
        if (this.checkEmptyOrFillArray()) {
            this.createNewLinkedListItem(item);
        }
        else {
            const searchItemOfLLIndex = Math.trunc(__classPrivateFieldGet(this, _DynamicArray_length, "f") / __classPrivateFieldGet(this, _DynamicArray_itemArrayLength, "f"));
            const searchItem = __classPrivateFieldGet(this, _DynamicArray_dynArr, "f").getItemByIndex(searchItemOfLLIndex);
            if (searchItem) {
                for (let i = 0; i < __classPrivateFieldGet(this, _DynamicArray_itemArrayLength, "f"); i++) {
                    if (!searchItem.data[i]) {
                        searchItem.data[i] = item;
                        __classPrivateFieldGet(this, _DynamicArray_dynArr, "f").changeItemDataByIndex(searchItemOfLLIndex, searchItem.data);
                        break;
                    }
                }
            }
            else {
                this.createNewLinkedListItem(item);
            }
        }
        __classPrivateFieldSet(this, _DynamicArray_length, (_a = __classPrivateFieldGet(this, _DynamicArray_length, "f"), _a++, _a), "f");
    }
    get(index) {
        const searchItemOfLLIndex = Math.trunc(index / __classPrivateFieldGet(this, _DynamicArray_itemArrayLength, "f"));
        const searchItem = __classPrivateFieldGet(this, _DynamicArray_dynArr, "f").getItemByIndex(searchItemOfLLIndex);
        if (searchItem) {
            return searchItem.data[index % __classPrivateFieldGet(this, _DynamicArray_itemArrayLength, "f")];
        }
        else {
            throw new Error('Такого элемента нет(((');
        }
    }
    remove(index) {
        var _a;
        const searchItemOfLLIndex = Math.trunc(index / __classPrivateFieldGet(this, _DynamicArray_itemArrayLength, "f"));
        const searchItem = __classPrivateFieldGet(this, _DynamicArray_dynArr, "f").getItemByIndex(searchItemOfLLIndex);
        const returnVal = searchItem.data[index % __classPrivateFieldGet(this, _DynamicArray_itemArrayLength, "f")];
        let current = searchItem;
        while (current !== null) {
            for (let i = current === searchItem ? index % __classPrivateFieldGet(this, _DynamicArray_itemArrayLength, "f") : 0; i < __classPrivateFieldGet(this, _DynamicArray_itemArrayLength, "f"); i++) {
                current.data[i] = current.data[i + 1] || current.next?.data[0] || undefined;
            }
            current = current?.next || null;
        }
        __classPrivateFieldSet(this, _DynamicArray_length, (_a = __classPrivateFieldGet(this, _DynamicArray_length, "f"), _a--, _a), "f");
        return returnVal;
    }
    get values() {
        let current = __classPrivateFieldGet(this, _DynamicArray_dynArr, "f").first;
        const self = this;
        return {
            *[Symbol.iterator]() {
                while (current) {
                    for (let i = 0; i < __classPrivateFieldGet(self, _DynamicArray_length, "f"); i++) {
                        if (current.data[i]) {
                            yield current.data[i];
                        }
                    }
                    current = current.next;
                }
            }
        };
    }
}
exports.default = DynamicArray;
_DynamicArray_itemArrayLength = new WeakMap(), _DynamicArray_length = new WeakMap(), _DynamicArray_dynArr = new WeakMap();
