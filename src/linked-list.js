const Node = require('./node');

class LinkedList {
  constructor () {
    this._head = null;
    this._tail = null;
    this.length = 0;
  }

  append(data) {   
    let node = new Node (data, null, null);
    if (!this._head) {
      this._head = node;
      this._tail = node;
    } else {
      this._tail.next = node;
      node.prev = this._tail;
      this._tail = node;
    }
    this.length++;
    return this;
  }

  head() {
    return this._head.data;
  }

  tail() {
    return this._tail.data;
  }

  at(index) {
    let pointer = this._head;
    let i = 0;
    while (i < this.length) {
      if (i === index) {
        return pointer.data;
      }
      pointer = pointer.next;
      i++;
    }
  }

  insertAt(index, data) {
    let pointer = this._head;
    let i = 0;
    let node = new Node(data, null, null);
    if (index === 0 & this.length === 0) {
      this.append(data);
    } else if (index === 0) {
      this._head.prev = node;
      node.next = this._head;
      this._head = node;
      this.length++;
    } else if (i === this.length) {
      this.append(data); 
    } else {
    while (i < this.length) {
        if (i === index) {
        pointer.prev.next = node;
        node.prev = pointer.prev;
        pointer.prev = node;
        node.next = pointer;
        this.length++;
        break;
      }
      pointer = pointer.next;
      i++;
    }
    }
    return this;
  }

  isEmpty() {
    return (this._head === null) ? true : false; 
  }

	clear() {
    this._head = new Node;
    this._tail = this._head;
    this.length = 0;
    return new LinkedList();
    }

  deleteAt(index) {
    let pointer = this._head;
    let i = 0;
    if (index === 0 && this.length === 1) {
        this._head = null;
        this._tail = null;
    } else if (index === 0) {
        this._head.next.prev = null;
        this._head = this._head.next;
    } else {
    while (i < this.length) {
      if (pointer === this._tail) {
        this._tail.prev.next = null;
        this._tail = this._tail.prev;
      }
      else if (i === index) {
        pointer.prev.next = pointer.next;
        pointer.next.prev = pointer.prev;
        break; 
      }
      pointer = pointer.next;
      i++;
    }
    }
    this.length--;
    return this;
  }

  reverse() {
    let pointer = this._head;
    let i = 0;
    let pseudoPrev = null;

    while (i < this.length) {
      let pseudoNext = pointer.next;
      pointer.next = pseudoPrev;
      pointer.prev = pseudoNext;
      pseudoPrev = pointer;
      pointer = pseudoNext;  
      i++; 
    }
    this._tail = this._head;
    this._head = pseudoPrev;
    return this;
  }

  indexOf(data) {
    let pointer = this._head;
    let i = 0;
    while (i < this.length) {
      if (pointer.data === data) {break};
      pointer = pointer.next;
      i++;
    }
    return i === this.length ? -1 : i;
  }
}

module.exports = LinkedList;
