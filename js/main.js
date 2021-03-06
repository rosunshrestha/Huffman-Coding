// JavaScript Document
function Encoder() {
    this.encode = document.getElementById("encode");
    this.encode1 = document.getElementById("encode1");
    this.input;
    this.occurrence;
    this.v;
    this.display;
    var counter = 0;
    this.encoded0utput;
    that = this;
    this.encode.onclick = function () {
        that.input = document.getElementById("input").value;
        that.occurrence = getPercentage(that.input);
        that.binCodes = getCodes(that.occurrence);
        that.encodedoutput = compressHuffman(that.input, that.binCodes);
        that.display = generateOutput(that.input, that.occurrence, that.binCodes, that.encodedoutput);
    }

    this.encode1.onclick = function () {
        clearAll();
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
        var counter = 0;
        var tree = new Array();
        var subTree = new Array();
        this.checkPosition = function () {
            if (tree[1] != undefined && tree.length > 0 && subTree.length > 0
                       && tree[0].frequency <= subTree[0].frequency && tree[1].frequency <= subTree[0].frequency)
                return "bottom";

            else if (tree.length > 0 && subTree.length > 0
                        && tree[0].frequency <= subTree[0].frequency)
                return "left";
            else if (subTree[1] != undefined && tree.length > 0 && subTree.length > 0
                        && tree[0].frequency > subTree[0].frequency && tree[0].frequency > subTree[1].frequency)
                return "top";
            else if (tree.length > 0 && subTree.length > 0
                        && tree[0].frequency > subTree[0].frequency)
                return "right";
            else if (tree.length > 1)
                return "bottom";
            else
                return "top";
        }
        this.getNext = function () {
            if (tree.length > 0 && subTree.length > 0
                       && tree[0].frequency < subTree[0].frequency)
                return tree.shift();

            if (tree.length > 0 && subTree.length > 0
                        && tree[0].frequency > subTree[0].frequency)
                return subTree.shift();

            if (tree.length > 0)
                return tree.shift();

            return subTree.shift();
        }

        var sortedProb = new Array();
        var codes = new Array();

        var i = 0;
        for (var elem in occurrence) {
            sortedProb[i] = new Array(elem, occurrence[elem]);

            i++;
        }

        sortedProb = sortedProb.sort(sortAccordingToOccurrence);
        var rectangles = new Array();
        for (var j = 0; j < sortedProb.length; j++) {
            //rectangles[j] = new Rectangle();
            //rectangles[j].value = sortedProb[j];
            //rectangles[j].draw();

            //to animate the rectangle
            //setInterval(rectangles[j].animate,500);
            //rectangles[j].remove();			
        }
        i = 0;
        for (var elem in sortedProb) {
            tree[i] = new node();
            tree[i].frequency = sortedProb[elem][1];
            tree[i].value = sortedProb[elem][0];
            i++;
        }
        while (tree.length + subTree.length > 1) {
            var temp;

            var reference = checkPosition();
            var left = getNext();
            if (left.value != undefined) {
                //rectangles[4].intervalID();
                var rectangle = new Rectangle();
                //rectangles[counter].addFunction(left.value, 0, reference);
                //counter++;
                rectangle.create(left.value, left.frequency, 0, reference);

            }

            var right = getNext();
            if (right.value != undefined) {
                var rectangle = new Rectangle();
                rectangle.create(right.value, left.frequency, 1, reference);
                //rectangles[counter].move(right.value, 1, reference);
                //rectangles[counter].addFunction(right.value, 1, reference);

                //counter++;
            }
            //var line=new Line();
            //line.addFunction(1,reference);
            var newnode = new node();
            newnode.left = left;
            newnode.right = right;
            newnode.frequency = left.frequency + right.frequency;
            var circle = new Circle();
            circle.create(newnode.frequency, reference);
            //circle.addFunction(newnode.frequency, reference);
            newnode.left.parent = newnode;
            newnode.right.parent = newnode;
            subTree.push(newnode);
        }
        // rectangles[0].test();

        //	console.log(subTree);
        var currentnode = subTree[0];

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

    function generateOutput(ip, codes, respectiveCode, encodedCode) {
        var opDiv = document.getElementById("info");
        var canvasDiv = document.getElementById("canvas");
        var header1 = document.getElementById("header1");
        var header2 = document.getElementById("header2");
        header1.style.display = "none";
        header2.style.display = "block";
        canvasDiv.style.display = "block";
        opDiv.style.display = "block";
        var frequencyOp = document.getElementById("respectives-frequency");
        var codesOp = document.getElementById("respectives-codes");
        var encodedOp = document.getElementById("encoded-code");
        var cost = document.getElementById("total-cost");
        var content = "";
        for (var elem in codes) {
            content += elem + "=" + codes[elem] + "<br/>";
        }
        frequencyOp.innerHTML = content;
        content = "";
        for (var elem in respectiveCode) {
            content += elem + "->" + respectiveCode[elem] + "<br/>";
        }
        codesOp.innerHTML = content;
        encodedOp.innerHTML = encodedCode.toString();
        content = "Before Encoding the total bits occupied =>" + ip.length * 8 + "<br/>";
        content += "After Encoding the total bits occupied =>" + encodedCode.length + "<br/>";
        cost.innerHTML = content;

    }

    function clearAll() {
        var opDiv = document.getElementById("info");
        var canvasDiv = document.getElementById("canvas");
        var header1 = document.getElementById("header1");
        var header2 = document.getElementById("header2");
        header1.style.display = "block";
        header2.style.display = "none";
        canvasDiv.style.display = "none";
        opDiv.style.display = "none";
        var c = document.getElementById("tree-canvas");
        context = c.getContext("2d");;
        context.clearRect(0, 0, c.width, c.height);
        var init = new Initialization;
        var encode = new Encoder();
	}

    function node() {
        this.left;
        this.right;
        this.value;
        this.frequency;
        this.parent;
        this.visited;
    }

}

//This function gives the number of occurrence of each letter and store it in an array
var encode = new Encoder();
//This is the main function to compress the given text

//main function that has all the encoding algorithms for huffmann encoding
//var counter=0;

/*function async_series ( fn_list, final_callback ) {
    console.log(fn_list);
    if (fn_list.length) {
        var fn = fn_list.shift();
        var callback = function (err) {
            if (err) {
                final_callback(err); // error, abort
            }
            else {
                setTimeout(function() {
                    async_series(fn_list,final_callback);
                }, 1000);
            }
        };
        fn(callback);
    }
    else {
        final_callback(null); // no errors
    }
}

*/
//abc();
//async_series(queue, function() { console.log("final is here"); });


