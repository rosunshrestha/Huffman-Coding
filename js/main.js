// JavaScript Document
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

var queue = [];
function abc() {
	for (var i=0; i<10; i++) {
		queue[i] = (function(num) {
			return function(cb) {
				console.log('this is ', num);
				if (cb) cb();
			}
		})(i);
	}
}
*/
//abc();
//async_series(queue, function() { console.log("final is here"); });



function Encoder() {
    this.encode = document.getElementById("encode");
    this.input;
    this.occurrence;
    this.v;
	var counter=0;
    this.encoded0utput;
    that = this;
    this.encode.onclick = function () {
        that.input = document.getElementById("input").value;
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
	var counter=0;
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
    var rectangles=new Array();
	for(var j=0;j<sortedProb.length;j++)
	{
		rectangles[j]=new Rectangle();
		rectangles[j].value=sortedProb[j];
		rectangles[j].draw();
		
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
			// var rectangle = new Rectangle();
            rectangles[counter].addFunction(left.value, 0, reference);
			counter++;
			//    rectangle.create(left.value, 0, reference);
        	
        }
		
        var right = getNext();
        if (right.value != undefined) {
            //var rectangle = new Rectangle();
            //rectangle.create(right.value, 1, reference);
        //rectangles[counter].move(right.value, 1, reference);
		rectangles[counter].addFunction(left.value, 0, reference);
			
		counter++;
		}
        var newnode = new node();
        newnode.left = left;
        newnode.right = right;
        newnode.frequency = left.frequency + right.frequency;
        var circle = new Circle();
        circle.create(newnode.frequency, reference);
        newnode.left.parent = newnode;
        newnode.right.parent = newnode;
        subTree.push(newnode);
    }
	rectangles[0].test();
    
	
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

function node() {
    this.left;
    this.right;
    this.value;
    this.frequency;
    this.parent;
    this.visited;
}

var encode = new Encoder();