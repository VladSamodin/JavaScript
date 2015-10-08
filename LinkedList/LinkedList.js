var Node  = function(value, prev, next) {
    this.value = value;
    this.prev = prev || null;
    this.next = next || null;
}

Node.prototype.getNext = function() {
    return this.next;
}

Node.prototype.getPrev = function() {
    return this.prev;
}

var LinkedList = function() {
    this.head = null;
    this.tail = null;
    this.count = 0;
}

LinkedList.prototype.addTail = function(value) {
    var newNode = new Node(value, this.tail);
    if (!this.head) {
        this.head = newNode;
    }
    else {
        this.tail.next = newNode;
    }
    this.tail = newNode;
    this.count++;
    return this;
};

LinkedList.prototype.addHead = function(value) {
    var newNode = new Node(value, null, this.head);
    if (!this.head) {
        this.tail = newNode;
    }
    else {
        this.head.prev = newNode;
    }
    this.head = newNode;
    this.count++;
    return this;
};

LinkedList.prototype.find = function(value) {
    var currentNode = this.head;
    while (currentNode) {
        if (currentNode.value === value)
            return currentNode;
        currentNode = currentNode.next;
    }
    return null;
};

LinkedList.prototype.findLast = function(value) {
    var currentNode = this.tail;
    while (currentNode) {
        if (currentNode.value === value)
            return currentNode;
        currentNode = currentNode.prev;
    }
    return null;
};

LinkedList.prototype.reverse = function() {
    var currentNode = this.head;
    var temp;
    while (currentNode) {
        temp = currentNode.prev;
        currentNode.prev = currentNode.next;
        currentNode.next = temp;
        currentNode = currentNode.prev;
    }
    temp = this.head;
    this.head = this.tail;
    this.tail = temp;
    return this;
};

LinkedList.prototype.deleteNode = function(node) {
    // node instanceof Node ?
    if (!node)
        throw new ReferenceError();
    if (!this.head)
        return this;

    var prevNode = node.prev;
    var nextNode = node.next;

    if (prevNode)
        prevNode.next = nextNode;
    else
        this.head = nextNode;
    if (nextNode)
        nextNode.prev = prevNode;
    else
        this.tail = prevNode;

    this.count--;
    return this;
};

LinkedList.prototype.deleteValue = function(value) {
    var toDelete = this.find(value);
    this.deleteNode(toDelete);
    return this;
};

LinkedList.prototype.insertBefore = function(node, value) {
    if (!node) 
        throw new ReferenceError();
    var prevNode = node.prev;
    var newNode = new Node(value, prevNode, node);
    if (prevNode)
        prevNode.next = newNode;
    else
        this.head = newNode;
    node.prev = newNode;
    this.count++;
    return this;
};

LinkedList.prototype.insertAfter = function(node, value) {
    if (!node) 
        throw new ReferenceError();
    var nextNode = node.next;
    var newNode = new Node(value, node, nextNode);
    if (nextNode)
        nextNode.prev = newNode;
    else
        this.tail = newNode;
    node.next = newNode;
    this.count++;
    return this;
};

LinkedList.prototype.print = function() {
    var resultString = "";
    var currentNode = this.head;
    while(currentNode) {
        //console.log(currentNode.value);
        resultString += " " + currentNode.value;
        currentNode = currentNode.next;
    }
    console.log(resultString);
    //console.log("count = "+ this.count);
    return this;
};

LinkedList.prototype.at = function(index) {
    var i, currentNode;
    if (index < -this.count || index >= this.count)
        throw new RangeError();
   
    if (index >= 0) {
        currentNode = this.head;
        for (i = 0; i < index; i++)
            currentNode = currentNode.next;
        return currentNode;
    }
    else {
        currentNode = this.tail;
        for (i = -1; i > index; i--)
            currentNode = currentNode.prev;
        return currentNode;
    }

    // var next            = index >= 0 ? Node.prototype.getNext : Node.prototype.getPrev;
    // var currentNode     = index >= 0 ? this.head              : this.tail;
    // var countIterations = index >= 0 ? index                  : -index - 1;
    // for (var i = 0; i < countIterations; i++)
    //     currentNode = next.apply(currentNode, null);
    // return currentNode;

}

LinkedList.prototype.deleteAt = function(index) {
    var toDelete = this.at(index);
    this.deleteNode(toDelete);
    return this;
}

LinkedList.prototype.insertAt = function(index, value) {        
    if (index >= this.count) {
        this.append(value);
    }
    else if (index < -this.count) {
        this.addHead(value);
    }
    else if (index < 0) {
        this.insertAfter(this.at(index), value);
    }
    else {
        this.insertBefore(this.at(index), value);
    }
    return this;
}

LinkedList.prototype.indexOf = function(value) {
    return this.find(value);
}


LinkedList.prototype.append = function(value) {
    this.addTail(value);
    return this;
}

LinkedList.prototype.each = function(func) {
    var currentNode = this.head;
    while (currentNode) {
        func(currentNode);
        currentNode = currentNode.next;
    }
    return this;
} 


var list = new LinkedList();

console.log("-------------------------------------------------------------------------");

console.log("list.append(1).append(2).append(3).append(4).append(5)\n\t.addHead(6).addHead(7);");

list.append(1).append(2).append(3).append(4).append(5)
    .addHead(6).addHead(7).print();

console.log("list.reverse()");

list.reverse().print();

console.log("list.reverse()\n\t.insertBefore(list.find(7), 8)\n\t.insertBefore(list.find(1), 0)");

list.reverse()
    .insertBefore(list.find(7), 8)
    .insertBefore(list.find(1), 0)
    .print();

console.log("list.insertAfter(list.find(5), 20)\n\t.insertAfter(list.head, 12)");

list.insertAfter(list.find(5), 20)
    .insertAfter(list.head, 12)
    .print();

console.log("list.insertAt(-50, -1)\n\t.insertAt(50, 23)\n\t.insertAt(0, -2)\n\t.insertAt(-1, 24)\n\t.insertAt(5, 7.5)\n\t.insertAt(-5, 14.5)");

list.insertAt(-50, -1)
    .insertAt(50, 23)
    .insertAt(0, -2)
    .insertAt(-1, 24)
    .insertAt(5, 7.5)
    .insertAt(-5, 14.5)
    .print();

console.log("list.deleteNode(list.head)\n\t.deleteNode(list.tail)\n\t.deleteValue(0)");

list.deleteNode(list.head)
    .deleteNode(list.tail)
    .deleteValue(0)
    .print();

console.log("list.deleteAt(0)\n\t.deleteAt(-1)\n\t.deleteAt(-2)\n\t.deleteAt(1)");

list.deleteAt(0)
    .deleteAt(-1)
    .deleteAt(-2)
    .deleteAt(1)
    .print();

console.log("list.each(function(node) {\n\tnode.value += 1;\n})");

list.each(function(node) {
    node.value += 1;
}).print();

console.log("list.reverse()");

list.reverse()
    .print();