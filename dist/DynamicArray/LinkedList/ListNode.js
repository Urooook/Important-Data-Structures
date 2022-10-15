"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ListNode {
    constructor(data) {
        this.next = null;
        this.prev = null;
        this.data = data;
    }
    getKey() {
        return this.data;
    }
}
exports.default = ListNode;
