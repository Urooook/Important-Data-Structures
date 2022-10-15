import {INodeObject} from "./interface";

export default class Node<T = unknown> implements INodeObject<T>{
    public iData: number;
    public dData;
    public leftChild: Node;
    public rightChild: Node;

    public displayNode() {
        console.log(this.iData);
        console.log('----');
        console.log(this.dData);
    }
}