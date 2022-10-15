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
var _DynamicVectorArray_capacity, _DynamicVectorArray_length, _DynamicVectorArray_buffer;
Object.defineProperty(exports, "__esModule", { value: true });
class DynamicVectorArray {
    constructor(cap) {
        _DynamicVectorArray_capacity.set(this, void 0);
        _DynamicVectorArray_length.set(this, void 0);
        _DynamicVectorArray_buffer.set(this, void 0);
        __classPrivateFieldSet(this, _DynamicVectorArray_capacity, cap, "f");
        __classPrivateFieldSet(this, _DynamicVectorArray_length, 0, "f");
        __classPrivateFieldSet(this, _DynamicVectorArray_buffer, new Array(cap), "f");
    }
    get length() {
        return __classPrivateFieldGet(this, _DynamicVectorArray_length, "f");
    }
    add(item) {
        var _a;
        if (__classPrivateFieldGet(this, _DynamicVectorArray_capacity, "f") === this.length) {
            this.updateArraySize();
        }
        __classPrivateFieldGet(this, _DynamicVectorArray_buffer, "f")[this.length] = item;
        __classPrivateFieldSet(this, _DynamicVectorArray_length, (_a = __classPrivateFieldGet(this, _DynamicVectorArray_length, "f"), _a++, _a), "f");
    }
    remove(index) {
        var _a;
        const deleteItem = __classPrivateFieldGet(this, _DynamicVectorArray_buffer, "f")[index];
        __classPrivateFieldGet(this, _DynamicVectorArray_buffer, "f")[index] = undefined;
        for (let i = index; i < this.length; i++) {
            __classPrivateFieldGet(this, _DynamicVectorArray_buffer, "f")[i] = __classPrivateFieldGet(this, _DynamicVectorArray_buffer, "f")[i + 1];
        }
        __classPrivateFieldSet(this, _DynamicVectorArray_length, (_a = __classPrivateFieldGet(this, _DynamicVectorArray_length, "f"), _a--, _a), "f");
        return deleteItem;
    }
    get(index) {
        return __classPrivateFieldGet(this, _DynamicVectorArray_buffer, "f")[index];
    }
    updateArraySize() {
        __classPrivateFieldSet(this, _DynamicVectorArray_capacity, __classPrivateFieldGet(this, _DynamicVectorArray_capacity, "f") * 2, "f");
        const newBuffer = new Array(__classPrivateFieldGet(this, _DynamicVectorArray_capacity, "f"));
        for (let i = 0; i < this.length; i++) {
            newBuffer[i] = __classPrivateFieldGet(this, _DynamicVectorArray_buffer, "f")[i];
        }
        __classPrivateFieldSet(this, _DynamicVectorArray_buffer, newBuffer, "f");
    }
    get values() {
        let current = __classPrivateFieldGet(this, _DynamicVectorArray_buffer, "f");
        return {
            *[Symbol.iterator]() {
                for (let i = 0; i < current.length; i++) {
                    yield current[i];
                }
            }
        };
    }
}
exports.default = DynamicVectorArray;
_DynamicVectorArray_capacity = new WeakMap(), _DynamicVectorArray_length = new WeakMap(), _DynamicVectorArray_buffer = new WeakMap();
