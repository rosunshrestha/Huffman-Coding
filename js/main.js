// JavaScript Document
//This is the main function to compress the given text




var c = document.getElementById("tree-canvas");
var ctx = c.getContext("2d");
var p=setInterval(generateLine,75);
var x=40;
var y=160
function generateLine(){
	if(y==0)
	clearInterval(p);
	ctx.moveTo(x,y);
	y-=20;
	x=x+20;
	ctx.lineTo(x,y);
	ctx.stroke();
}
function encode()
{
	var input = document.getElementById("input").value;
	var occurrence = getPercentage(input);
	var binCodes=getCodes(occurrence);
	
}
//This function gives the number of occurrence of each letter and store it in an array
function getPercentage(input)
{
	
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
	this.getNext = function() {
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
		var right = getNext();
		var newnode = new node();
		newnode.left = left;
		newnode.right = right;
		newnode.frequency = left.frequency + right.frequency;
		newnode.left.parent = newnode;
		newnode.right.parent = newnode;
		secondTree.push(newnode);
		console.log(secondTree);
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

function node(){
	this.left;
	this.right;
	this.value;
	this.frequency;
	this.parent;	
	this.visited
}


//To check the file extension of the file browsed
/*var file=document.getElementById("filename");

file.onchange=function(){
	alert(this.textContent.toString())
	var ext=this.value.split(".");
	var a;
	alert(ext[1]);
	switch(ext[1])
	{
		case "doc":
			a=true;
			break;
		case "docx":
			a=true;
			break;
		case "txt":
			a=true;
			break;
		default:
			a=false;			
	}
	if(a==true)
	{
		var a= new File
	}
	
}

*/