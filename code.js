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

    render() {
        let renderNode = function(n) {
            let table = document.createElement("table");
            table.style.textAlign = "center";
            let r1 = document.createElement("tr");
            let topNodeRendered = document.createElement("td");
            topNodeRendered.setAttribute("colspan", 2);
            topNodeRendered.innerText = n.id;
            r1.appendChild(topNodeRendered);
            table.appendChild(r1);
            let r2 = document.createElement("tr");
            let child0Rendered = document.createElement("td");
            child0Rendered.style.verticalAlign = "top";
            if (n.children[0]) child0Rendered.appendChild(renderNode(n.children[0]));
            r2.appendChild(child0Rendered);
            let child1Rendered = document.createElement("td");
            child1Rendered.style.verticalAlign = "top";
            if (n.children[1]) child1Rendered.appendChild(renderNode(n.children[1]));
            r2.appendChild(child1Rendered);
            table.appendChild(r2);
            return table;
        }
        let treeRendered = renderNode(this.root);
        return treeRendered;
    }
}

document.querySelector("button").addEventListener("click", function() {
    let word = document.querySelector("input[type=text]").value;
    let x = new tTree(word[0]);
    for (let i = 1; i < word.length; i++) {
        x.addLetter(word[i]);
    }
    document.querySelector("#treeContainer").innerHTML = "";
    document.querySelector("#treeContainer").appendChild(x.render());
    document.querySelector("#ipldisp").innerText = x.internalPathLength;
});

document.querySelector("input[type=text]").addEventListener("input", function() {
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let output = "";
    for (let i = 0; i < this.value.length; i++) {
        if (alphabet.includes(this.value[i].toUpperCase())) output += this.value[i];
    }
    this.value = output;
});

document.querySelector("button").click();