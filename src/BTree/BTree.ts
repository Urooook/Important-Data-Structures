import Node from "./Node";

export default class BTree {
    private root: Node;
    t: number;

    rootGet() {
        return this.root;
    }

    constructor(degree: number) {
        this.root = null;
        this.t = degree;
    }

    public insert(data: number){
        if(this.root === null) {
            this.root = new Node(this.t);
            this.root.leaf = true;
            this.root.key[0] = data;
        } else {
            this.root = this.root.findNode(this.root, data, this.t, this.root);
        }
    }
}

const bt = new BTree(3);
bt.insert(2);
bt.insert(4);
bt.insert(3);
bt.insert(5);
bt.insert(11);
bt.insert(22);

console.log(bt.rootGet().child[0])