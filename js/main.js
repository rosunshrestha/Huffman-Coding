// JavaScript Document
//This is the main function to compress the given text

//main function that has all the encoding algorithms for huffmann encoding
function Encoder() {
    this.encode = document.getElementById("encode");
    this.input;
    this.occurrence;
    this.binCodes;
    this.encoded0utput;
    that = this;
    this.encode.onclick = function () {
        that.input = document.getElementById("input").value;
        console.log(input.value);
        that.occurrence = getPercentage(that.input);
        that.binCodes = getCodes(that.occurrence);
        that.encodedoutput = compressHuffman(that.input, that.binCodes);
    }
}

//This function gives the number of occurrence of each letter and store it in an array
function getPercentage(input) {
    var per = new Array();
    var count = 0;
    var len = input.length;
    while (count < len) {
        var letter = input.charAt(count);
        if (per[letter]) {
            per[letter] = per[letter] + 1;
        }
        else {
            per[letter] = 1;
        }
        count++;
    }

    for (var elem in per) {
        per[elem] = per[elem];
    }
    return per;
}

function sortAccordingToOccurrence(a, b) {
    return a[1] - b[1];
}

//This function gives the binary codes for each letter in an array parameter
function getCodes(occurrence) {
    var tree = new Array();
    var secondTree = new Array();
    this.getNext = function () {
        if (tree.length > 0 && secondTree.length > 0
                   && tree[0].frequency < secondTree[0].frequency)
            return tree.shift();

        if (tree.length > 0 && secondTree.length > 0
                    && tree[0].frequency > secondTree[0].frequency)
            return secondTree.shift();

        if (tree.length > 0)
            return tree.shift();

        return secondTree.shift();
    }

    var sortedProb = new Array();
    var codes = new Array();

    var i = 0;
    for (var elem in occurrence) {
        sortedProb[i] = new Array(elem, occurrence[elem]);

        i++;
    }

    sortedProb = sortedProb.sort(sortAccordingToOccurrence);
    i = 0;

    for (var elem in sortedProb) {
        tree[i] = new node();
        tree[i].frequency = sortedProb[elem][1];
        tree[i].value = sortedProb[elem][0];
        i++;
    }

    while (tree.length + secondTree.length > 1) {
        var left = getNext();
        if (left.value != undefined) {
            var rectangle = new Rectangle();
            rectangle.create(left.value, 0);
        }
        var right = getNext();
        if (right.value != undefined) {
            var rectangle = new Rectangle();
            rectangle.create(right.value, 1);
        }
        var newnode = new node();
        newnode.left = left;
        newnode.right = right;
        newnode.frequency = left.frequency + right.frequency;
        newnode.left.parent = newnode;
        newnode.right.parent = newnode;
        secondTree.push(newnode);
    }
    //	console.log(secondTree);
    var currentnode = secondTree[0];

    var code = "";
    while (currentnode) {
        if (currentnode.value) {
            codes[currentnode.value] = code;
            code = code.substr(0, code.length - 1);
            currentnode.visited = true;
            currentnode = currentnode.parent;
        }
        else if (!currentnode.left.visited) {
            currentnode = currentnode.left;
            code += "0";
        }
        else if (!currentnode.right.visited) {
            currentnode = currentnode.right;
            code += "1";
        }
        else {
            currentnode.visited = true;
            currentnode = currentnode.parent;
            code = code.substr(0, code.length - 1);
        }
    }

    return codes;

}

function compressHuffman(input, codes) {
    var output = input.split("");
    for (var elem in output) {
        output[elem] = codes[output[elem]];
    }
    return output.join("");
}

function node() {
    this.left;
    this.right;
    this.value;
    this.frequency;
    this.parent;
    this.visited;
}




var encode = new Encoder();