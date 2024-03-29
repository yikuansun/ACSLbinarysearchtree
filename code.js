class tNode {
    id;
    children = [null, null];
    
    constructor(id) {
        this.id = id.toUpperCase();
        this.children = [null, null];
    }

    addNode(n) {
        if (n.id <= this.id) {
            if (this.children[0]) this.children[0].addNode(n);
            else this.children[0] = n;
        }
        else { // n.id > this.id
            if (this.children[1]) this.children[1].addNode(n);
            else this.children[1] = n;
        }
    }
}

class tTree {
    root;
    static alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    constructor(rootLetter) {
        this.root = new tNode(rootLetter);
    }

    addLetter(l) {
        this.root.addNode(new tNode(l));
    }

    get internalPathLength() {
        let rec = function(startNode, startDepth) {
            if (!startNode.children[0] && !startNode.children[1]) {
                return startDepth;
            }
            else if (startNode.children[0] && !startNode.children[1]) {
                return startDepth + rec(startNode.children[0], startDepth + 1);
            }
            else if (!startNode.children[0] && startNode.children[1]) {
                return startDepth + rec(startNode.children[1], startDepth + 1);
            }
            else { // startNode.children[0] && startNode.children[1]
                return startDepth + rec(startNode.children[0], startDepth + 1) + rec(startNode.children[1], startDepth + 1);
            }
        }
        return rec(this.root, 0);
    }
}

let x = new tTree("a");
x.addLetter("m");
x.addLetter("e");
x.addLetter("r");
x.addLetter("i");
x.addLetter("c");
x.addLetter("a");
x.addLetter("n");