
function Node(value, parent, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = parent;
}

function Tree() {
    var i;
    this.root = null;
    for (i = 0; i < arguments.length; i++) {
        this.add(arguments[i]);
    }
}

Tree.prototype.add = function(value) {
    if (!this.root) {
        this.root = new Node(value);
        return this;
    }
    
    (function add (node) {
        if (value > node.value)
            if (node.right)
                add(node.right);
            else
                node.right = new Node(value, node);
        else
            if (node.left)
                add(node.left);
            else
                node.left = new Node(value, node);
    })(this.root);
    return this;
};

Tree.prototype.print = function () {
    var resultString = "";
    (function print (node) {
        if (!node)
            return;
        print(node.left);
        //console.log(node.value);
        resultString += " " + node.value;
        print(node.right);
    })(this.root);
    console.log(resultString);
    return this;
}

var extend = function(child, parent) {
    var temp = function() { };
    temp.prototype = parent.prototype;
    child.prototype = new temp();
    child.prototype.constructor = child;
    child.superClass = parent.prototype;
    return child;
}

var ExtendedTree = function() {
    Tree.apply(this, arguments);
}

extend(ExtendedTree, Tree);

ExtendedTree.prototype.find = function(value) {
    return (
        function find(node) {
            if (!node)
                return null;
            if (node.value === value)
                return node;
            if (value > node.value)
                return find(node.right);
            else
                return find(node.left);
        }
    )(this.root);
}

ExtendedTree.prototype.deleteValue = function (value) {
    this.deleteNode(this.find(value));
    return this;
}

ExtendedTree.prototype.deleteNode = function (node) {
    if (!node)
        throw new ReferenceError();
    var reallyDeletedNode;
    var childDeletedNode;
    var nodeDeletedValue = node;
    if (!nodeDeletedValue)
        return this;
    if (!nodeDeletedValue.left || !nodeDeletedValue.right)
        reallyDeletedNode = nodeDeletedValue;
    else
        reallyDeletedNode = this.getSuccessor(nodeDeletedValue);
    childDeletedNode = reallyDeletedNode.left || reallyDeletedNode.right;
    if (childDeletedNode)
        childDeletedNode.parent = reallyDeletedNode.parent;
    if (!reallyDeletedNode.parent)
        this.root = childDeletedNode;
    else
        if (reallyDeletedNode === reallyDeletedNode.parent.left)
            reallyDeletedNode.parent.left = childDeletedNode;
        else
            reallyDeletedNode.parent.right = childDeletedNode;
    if (nodeDeletedValue !== reallyDeletedNode)
        nodeDeletedValue.value = reallyDeletedNode.value;
    return this;
}



ExtendedTree.prototype.getSuccessor = function (node) {
    if (!node)
        throw new ReferenceError();
    if (node.right)
        return ExtendedTree.prototype.minimumTree(node.right);
    var currentNode = node;
    var parentNode = currentNode.parent;
    while (parentNode && currentNode === parentNode.right) {
        currentNode = parentNode;
        parentNode = currentNode.parent;
    }
    return parentNode; 
}

ExtendedTree.prototype.minimumTree = function minimum (node) {
    if (!node)
        throw new ReferenceError();
    if (node.left)
        return minimum(node.left);
    else
        return node;
}

var tree = new ExtendedTree(5, 4, 3, 8, 7);

tree.add(13).add(11).add(12).add(14).print();
console.log("");

tree.deleteValue(4).print();
console.log("");

tree.deleteValue(11).print();
console.log("");

tree.deleteValue(5).print();
