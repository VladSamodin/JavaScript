var Node  = function(value, prev, next) {
    this.value = value;
    this.prev = prev || null;
    this.next = next || null;
}

var LinkedList = function() {
    this.head = null;
    this.tail = null;
    this.count = 0;
}

LinkedList.prototype.addTail = function(value) {
    var newNode = new Node(value, this.tail);
    if (!this.head){
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
    if (!this.head){
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
    var prevNode = node.prev;
    //var nextNode = node.next;
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
    //var prevNode = node.prev;
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
};



var list = new LinkedList();

list.addTail(1).addTail(2).addTail(3).addTail(4).addTail(5)
    .addHead(6).addHead(7);

list.print();
list.reverse();

console.log("");
list.print();

list.reverse();

list.insertBefore(list.find(7), 8)
    .insertBefore(list.find(1), 0);

console.log("");
list.print();

list.insertAfter(list.find(5), 20)
    .insertAfter(list.head, 12);

console.log("");
list.print();

list.deleteNode(list.head)
    .deleteNode(list.tail)
    .deleteValue(0);

console.log("");
list.print();

list.reverse();

console.log("");
list.print();