export default class Node {
    key: number[];
    child: any[];
    leaf: boolean;
    n: number;

    constructor(deg: number) {
        this.key = new Array(deg);
        this.leaf = true;
        this.child = new Array(deg + 1);
        this.n = 0;
        for(let i=0; i<deg; i++) {
            this.child[i] = null;
        }
    }

    public findNode(temp: Node, data: number, t: number, root: Node){
        if(this.leaf) {
            let i = t;
            while(!this.key[i-1]){
                i--;
            }
            while(this.key[i-1] > data && i !== 0) {
                this.key[i] = this.key[i-1];
                i--;
            }
            this.key[i] = data;
            this.n+=1;
        } else {
            let i = 0;
            while(i< this.n && data> this.key[i]){
                i++
            }
            this.child[i].findNode(this, data, t, root);
        }

        if(this.n === t) {
            if(temp === root) {
                const s = new Node(t);
                s.leaf = false;
                s.child[0] = this;
                s.splitChild(this, t);
                return s;
            } else {
                temp.splitChild(this,t)
            }
        }
        return root;
    }

    public splitChild(temp: Node, t: number) {
        const rightNode = new Node(t);
        let i_right=0;
        const move_up = Math.trunc((t-1)/2);
        let n_fullNode = temp.n;
        let carry = temp.key[move_up];

        const walk_child = Math.trunc(t/2);
        let i_child = 0;

        for(let i=move_up+1; i<n_fullNode; i++){
            rightNode.key[i_right]= temp.key[i];
            i_right++;
            temp.n = temp.n - 1;
            rightNode.n = rightNode.n + 1;
        }

        if(temp.leaf === false){
            for(let i = walk_child; i<=t; i++){
                rightNode.child[i_child]= temp.child[i];
                i_child++;
            }
            rightNode.leaf = temp.leaf;
        }

        let hold = t-1;
        while(this.child[hold] !== temp){
            hold--;
        }
        this.child[hold+1] = rightNode;
        let j = t-1;
        while(this.key[j-1] && j !==0){
            j--;
        }
        this.key[j] = carry;
        this.n++;
        temp.n--;
    }
}