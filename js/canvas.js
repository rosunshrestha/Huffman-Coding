// JavaScript Document
var framesPerSecond=0.7;
var x=150;
var y=20;
var i=0;

function draw() {
    requestAnimationFrame(draw);
    // Drawing code goes here
	console.log(i++);
}
//draw();
var position;
var bottomPosition;
/*var c= new Canvas();
function Canvas() {
  */  
var c = document.getElementById("tree-canvas");
var ctx = c.getContext("2d");
function Block(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Block.prototype.update = function(){
    if(this.y < 360){
        this.y+=10   
    }else{
        this.y = 0;   
    }
};

Block.prototype.render = function(){
	ctx.clearRect(this.x,this.y-10,this.width,this.height);
    ctx.fillRect(this.x, this.y, this.width, this.height);
};

//var b=new Block(60,80,40,40);
//setInterval(main,300);
function main()
{
b.update();
b.render();
}
var t = 0;
var positionX= 150;
bottomPosition = 50;
var positionY = 20;
//ctx.arc(20,20,5,0,Math.PI,);
//ctx.stroke();
var subTreePosition = new Array();
var childTreePosition = new Array();

function checkSize() {
    if (positionX >= c.width - 40)
        c.width = positionX + 60;
    //if (positionY >= c.height - 40)
      //  c.height = poitionY + 60;
}

//}

function Rectangle() {
    //this.position_top = positionY-positionY/10;
    //this.position_left = positionX-positionX/10;
    this.value=new Array;
	this.top = positionY;
    this.height = 20;;
    this.left = positionX;
    this.width =  40;
    var that = this;
	var count=0;
	this.draw=function(){
		ctx.fillStyle="#000";
		ctx.fillRect(this.left, this.top, 40, 20);
		ctx.fillStyle="#fff";
		ctx.fillText(that.value[0]+","+that.value[1], positionX+10, positionY+12, 20);
		positionX+=41;
	}
	this.remove=function(){
		//ctx.clearRect(that.left,that.top,40,20);
		
	}
	this.update=function(x,y){
		
		if(count>10)
		{
			if(that.left>x){
				that.left-=40;
				if(that.left<x)
					that.left=x;
		
			}
			else{
				that.left+=40;
				if(that.left>x)
					that.left=x;
		
			}
		}
		if(count>10)
		that.top+=20;
		else
		that.top+=2;
		count++;
		if(that.top>y)
		that.left=x;
		
		if(that.left==x && that.top==y)
		window.cancelAnimationFrame();
	}
	this.render=function(){
		if(count==11)
		ctx.clearRect(that.left+40,that.top-20,that.width,that.height);
		else if(count>11){
		ctx.clearRect(that.left-40,that.top-20,that.width,that.height);
		}
		else
		{
			ctx.clearRect(that.left,that.top-2,that.width,that.height);
		
		}
		ctx.fillStyle="#000";
		ctx.fillRect(this.left,this.top,this.width,this.height);
		ctx.fillStyle="#fff";
		ctx.fillText(that.value[0]+","+that.value[1],this.left+10,this.top+12,20);
		ctx.stroke();
	}
	this.intervalID=function(){ that.animate()}
	this.animate=function(x,y){
	that.update(x,y);
		that.render();	
		setTimeout(function() {
        requestAnimationFrame(that.animate);
 
        // animating/drawing code goes here
 
 
    }, 1000 / framesPerSecond);	
	
	}
    this.create = function (value, direction, reference) {

        //if(direction==0)
		if (reference == "bottom") {
            positionX = bottomPosition + 70;
            positionY = c.height - 100;
            if (direction == 0)
            { positionX += 55; }
            bottomPosition = positionX;

        }
        else if (reference == "left") {
            position = subTreePosition.shift();
            positionX = position[0] - 100;
            positionY = position[1] - 35;
            if (positionX < 80) {
                //ctx.translate(positionX+(80-positionX),0);
            }

        }
        else if (reference == "right") {
            position = subTreePosition.shift();
            positionX = position[0] + 50;
            positionY = position[1] - 35;
        }
		
		
        that.animate(positionX, positionY);
		ctx.rect(positionX, positionY, 40, 20);
        ctx.fillStyle = "#330066";
        ctx.stroke();
        ctx.fillText(value, positionX + 10, positionY + 10, 20);
		

        if (direction == 1) {
            if (reference == "bottom") {
                positionY = that.top;
                positionX += 20;
                var rline = new Line();
                rline.create(1);
                positionX -= 70;
                var lline = new Line();
                lline.create(0);
                positionX += 35;
                positionY -= 35;
            }
        }
        if (reference == "left") {

            positionY += 50;
            positionX += 20;
            var rline = new Line();
            rline.create(3);
            positionX -= 70;
            //var lline=new Line();
            //lline.create(4);
            positionX += 35;
            positionY -= 35;
        }
        if (reference == "right") {
            positionY += 50;
            positionX += 20;
            var rline = new Line();
            rline.create(4);
            positionX -= 70;
        }

    }
	
}

Rectangle.prototype.update=function(){
    if(this.top < 360){
        this.y+=10   
    }else{
        this.y = 0;   
    }
}

Rectangle.prototype.render=function(){
    context.fillRect(this.left, this.top, this.width, this.height);
};

function generateLine(val) {
    //if(y==0)
    //clearInterval(p);
    ctx.moveTo(x, y);
    y -= 20;
    x = x + 20;
    ctx.lineTo(x, y);
    ctx.stroke();
}
function Line() {
    this.top = t;
    this.bottom = 50;
    this.left = t;
    this.right = 90;
    this.create = function (direction, x, y) {
        ctx.moveTo(positionX, positionY);
        if (direction == 0)
            ctx.lineTo(positionX + 35, positionY - 50);
        else if (direction == 1)
            ctx.lineTo(positionX - 35, positionY - 50);
        else if (direction == 3) {
            ctx.moveTo(positionX, positionY - 50);
            ctx.lineTo(positionX + 35, positionY - 100);
            ctx.moveTo(positionX + 70, positionY - 50);
            ctx.lineTo(positionX + 35, positionY - 100);
        }
        else if (direction == 4) {
            ctx.moveTo(positionX, positionY - 50);
            ctx.lineTo(positionX - 35, positionY - 100);
            ctx.moveTo(positionX - 70, positionY - 55);
            ctx.lineTo(positionX - 35, positionY - 100);
        }
        else if (direction == 7) {
            var ldata = childTreePosition.shift();
            var rdata = childTreePosition.shift();
            ctx.moveTo(ldata[0], ldata[1] - 40);
            ctx.lineTo(x, y - 15);
            ctx.moveTo(rdata[0], rdata[1] - 40);
            ctx.lineTo(x, y - 15);
        }
        ctx.stroke();
    }
}

function Circle() {
    this.top = t;
    this.bottom = 50;
    this.left = t;
    this.right = 90;
    this.create = function (value, reference) {


        if (reference == "top") {
            positionNode1 = subTreePosition.shift();
            positionNode2 = subTreePosition.shift();
            childTreePosition.push(positionNode1);
            childTreePosition.push(positionNode2);
            positionX = (positionNode1[0] + positionNode2[0]) / 2;
            if (positionNode1[1] > positionNode2[1])
                positionY = positionNode1[1] - 100;
            else
                positionY = positionNode2[1] - 100;

            var lline = new Line();
            lline.create(7, positionX, positionY);
        }
        if (reference == "left") {
            //positionNode1=subTreePosition.shift();
            //childTreePoisiton.push(positionNode1);
            positionX = positionX + 70;
            positionY -= 50;
        }
        if (reference == "right") {
            //positionNode1=subTreePosition.shift();
            //childTreePoisiton.push(positionNode1);
            positionX = positionX + 35;
            positionY -= 85;
        }
        ctx.beginPath();
        ctx.arc(positionX, positionY - 35, 20, 0, 2 * Math.PI);
        ctx.fillText(value, positionX, positionY - 35, 10);
        ctx.stroke();
        subTreePosition.push([positionX, positionY - 15]);


    }
}

