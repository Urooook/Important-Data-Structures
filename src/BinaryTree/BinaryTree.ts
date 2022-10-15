import Node from "./Node";
import {IBinaryTreeObject, keyType} from "./interface";

export default class BinaryTree implements IBinaryTreeObject{
    #root: Node;

    constructor(data: keyType[] = null) {
        this.#root = null;
        if(data !== null) {
            data.forEach((el) => this.add(el));
        }
    }

    get root() {
        return this.#root;
    }

    public has(key: keyType): boolean {
        if(!this.#root) {
            return false;
        }
        key = this.getKey(key);
        let current = this.#root;

        while (current.iData !== key) {
            if(key < current.iData) {
                current = current.leftChild;
            } else {
                current = current.rightChild;
            }
            if(!current) return false;
        }
        return true;
    }

    public add(value: keyType): void {
        const key = this.getKey(value);
        const newNode = new Node();
        newNode.iData = key;
        newNode.dData = value;

        if(this.#root === null) {
            this.#root = newNode;
        } else {
            let current: Node = this.#root;
            let parent: Node;

            while(true) {
                parent = current;
                if(!current) break;
                if(key < current.iData){
                    current = current.leftChild;
                    if(!current){
                        parent.leftChild = newNode;
                        break;
                    }
                } else {
                    current = current.rightChild;
                    if(!current) {
                        parent.rightChild = newNode;
                        break;
                    }

                }
            }
        }
    }

    public delete(key: keyType): boolean {
        if(!this.#root) return false;
        key = this.getKey(key);
        let current = this.#root;
        let parent = this.#root;
        let isLeftChild = true;

        while(current.iData !== key){
            parent = current;
            if(key < current.iData){
                isLeftChild = true;
                current = current.leftChild;
            } else {
                isLeftChild = false;
                current = current.rightChild;
            }
            if(!current) return false;
        }

        if(!current.leftChild && !current.rightChild) {
            if(current === this.#root) {
                this.#root = null;
            } else if(isLeftChild) {
                parent.leftChild = null;
            } else {
                parent.rightChild = null;
            }
        } else if(!current.rightChild) {
            if(current === this.#root) {
                this.#root = current.leftChild;
            } else if(isLeftChild) {
                parent.leftChild = current.leftChild;
            } else {
                parent.rightChild = current.leftChild;
            }
        } else if(!current.leftChild) {
            if(current === this.#root) {
                this.#root = current.rightChild;
            } else if(isLeftChild) {
                parent.leftChild = current.rightChild;
            } else {
                parent.rightChild = current.rightChild;
            }
        } else {
            const successor = this.getSuccessor(current);

            if(current === this.#root) {
                this.#root = successor;
            } else if(isLeftChild){
                parent.leftChild = successor;
            } else {
                parent.rightChild = successor;
            }
            return true;
        }
    }

    private getSuccessor(delNode: Node): Node {
        let successorParent = delNode;
        let successor = delNode;
        let current = delNode.rightChild;

        while (!!current){
            successorParent = successor;
            successor = current;
            current = current.leftChild;
        }

        if(successor !== delNode.rightChild) {
            successorParent.leftChild = successor.rightChild;
            successor.leftChild = delNode.leftChild;
            successor.rightChild = delNode.rightChild;
        }
        return successor;
    }

    private getKey(key: keyType): number {
        key = String(key);
        let keyCode = 0;
        for(let i=0; i< key.length; i++){
            keyCode += key[i].charCodeAt(0);
        }
        return keyCode;
    }
}



