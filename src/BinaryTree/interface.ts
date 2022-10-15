import Node from "./Node";
import {KeyType} from "../HashMap/interface";

export type keyType = number | string;

export interface INodeObject<T> {
    iData: number
    dData: T
    leftChild: Node
    rightChild: Node
}

export interface IBinaryTreeObject {
    has(key: KeyType): boolean
    add(value: keyType): void
    delete(key: keyType): boolean
}