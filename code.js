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
}