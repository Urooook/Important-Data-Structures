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
var _BinaryTree_root;
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
class BinaryTree {
    constructor(data = null) {
        _BinaryTree_root.set(this, void 0);
        __classPrivateFieldSet(this, _BinaryTree_root, null, "f");
        if (data !== null) {
            data.forEach((el) => this.add(el));
        }
    }
    get root() {
        return __classPrivateFieldGet(this, _BinaryTree_root, "f");
    }
    has(key) {
        if (!__classPrivateFieldGet(this, _BinaryTree_root, "f")) {
            return false;
        }
        key = this.getKey(key);
        let current = __classPrivateFieldGet(this, _BinaryTree_root, "f");
        while (current.iData !== key) {
            if (key < current.iData) {
                current = current.leftChild;
            }
            else {
                current = current.rightChild;
            }
            if (!current)
                return false;
        }
        return true;
    }
    add(value) {
        const key = this.getKey(value);
        const newNode = new Node_1.default();
        newNode.iData = key;
        newNode.dData = value;
        if (__classPrivateFieldGet(this, _BinaryTree_root, "f") === null) {
            __classPrivateFieldSet(this, _BinaryTree_root, newNode, "f");
        }
        else {
            let current = __classPrivateFieldGet(this, _BinaryTree_root, "f");
            let parent;
            while (true) {
                parent = current;
                if (!current)
                    break;
                if (key < current.iData) {
                    current = current.leftChild;
                    if (!current) {
                        parent.leftChild = newNode;
                        break;
                    }
                }
                else {
                    current = current.rightChild;
                    if (!current) {
                        parent.rightChild = newNode;
                        break;
                    }
                }
            }
        }
    }
    delete(key) {
        if (!__classPrivateFieldGet(this, _BinaryTree_root, "f"))
            return false;
        key = this.getKey(key);
        let current = __classPrivateFieldGet(this, _BinaryTree_root, "f");
        let parent = __classPrivateFieldGet(this, _BinaryTree_root, "f");
        let isLeftChild = true;
        while (current.iData !== key) {
            parent = current;
            if (key < current.iData) {
                isLeftChild = true;
                current = current.leftChild;
            }
            else {
                isLeftChild = false;
                current = current.rightChild;
            }
            if (!current)
                return false;
        }
        if (!current.leftChild && !current.rightChild) {
            if (current === __classPrivateFieldGet(this, _BinaryTree_root, "f")) {
                __classPrivateFieldSet(this, _BinaryTree_root, null, "f");
            }
            else if (isLeftChild) {
                parent.leftChild = null;
            }
            else {
                parent.rightChild = null;
            }
        }
        else if (!current.rightChild) {
            if (current === __classPrivateFieldGet(this, _BinaryTree_root, "f")) {
                __classPrivateFieldSet(this, _BinaryTree_root, current.leftChild, "f");
            }
            else if (isLeftChild) {
                parent.leftChild = current.leftChild;
            }
            else {
                parent.rightChild = current.leftChild;
            }
        }
        else if (!current.leftChild) {
            if (current === __classPrivateFieldGet(this, _BinaryTree_root, "f")) {
                __classPrivateFieldSet(this, _BinaryTree_root, current.rightChild, "f");
            }
            else if (isLeftChild) {
                parent.leftChild = current.rightChild;
            }
            else {
                parent.rightChild = current.rightChild;
            }
        }
        else {
            const successor = this.getSuccessor(current);
            if (current === __classPrivateFieldGet(this, _BinaryTree_root, "f")) {
                __classPrivateFieldSet(this, _BinaryTree_root, successor, "f");
            }
            else if (isLeftChild) {
                parent.leftChild = successor;
            }
            else {
                parent.rightChild = successor;
            }
            return true;
        }
    }
    getSuccessor(delNode) {
        let successorParent = delNode;
        let successor = delNode;
        let current = delNode.rightChild;
        while (!!current) {
            successorParent = successor;
            successor = current;
            current = current.leftChild;
        }
        if (successor !== delNode.rightChild) {
            successorParent.leftChild = successor.rightChild;
            successor.leftChild = delNode.leftChild;
            successor.rightChild = delNode.rightChild;
        }
        return successor;
    }
    getKey(key) {
        key = String(key);
        let keyCode = 0;
        for (let i = 0; i < key.length; i++) {
            keyCode += key[i].charCodeAt(0);
        }
        return keyCode;
    }
}
exports.default = BinaryTree;
_BinaryTree_root = new WeakMap();
