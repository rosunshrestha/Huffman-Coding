// JavaScript Document
var framesPerSecond = 0.7;
var x = 150;
var y = 20;
var i = 0;
counter = 0;
var create = [];
var position;
var bottomPosition;
/*var c= new Canvas();
function Canvas() {
  */
var c = document.getElementById("tree-canvas");
var ctx = c.getContext("2d");

//var b=new Block(60,80,40,40);
//setInterval(main,300);
function main() {
    b.update();
    b.render();
}
var t = 0;
var positionX = 150;
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
    this.value = new Array;
    this.top = positionY;
    this.height = 20;;
    this.left = positionX;
    this.width = 40;
    this.intervalID;
    var that = this;
    var count = 0;

    this.draw = function () {
        ctx.fillStyle = "#000";
        ctx.fillRect(this.left, this.top, 40, 20);
        ctx.fillStyle = "#fff";
        ctx.fillText(that.value[0] + "," + that.value[1], positionX + 10, positionY + 12, 20);
        positionX += 41;
    }

    this.remove = function () {
        //ctx.clearRect(that.left,that.top,40,20);

    }

    function async_series(fn_list, final_callback) {
        console.log(fn_list);
        if (fn_list.length) {
            var fn = fn_list.shift();
            var callback = function (err) {
                if (err) {
                    final_callback(err); // error, abort
                }
                else {
                    setTimeout(function () {
                        async_series(fn_list, final_callback);
                    }, 15000);
                }
            };
            fn(callback);
        }
        else {
            final_callback(null); // no errors
        }
    }
	
	//This function specify the position of the rectangle to be rendered
    this.update = function (xPos, yPos) {

        if (count > 2) {
            if (that.left > xPos) {
                that.left -= 60;
                if (that.left < xPos)
                    that.left = xPos;

            }
            else {
                that.left += 60;
                if (that.left > xPos)
                    that.left = xPos;

            }
        }
        if (count > 2)
            that.top += 60;
        else
            that.top += 10;
        count++;
        if (that.top > yPos)
            that.top = yPos;

        if (that.left == xPos && that.top == yPos)
            window.cancelAnimationFrame(that.intervalID);

        //that.left=xPos;
        //that.top=yPos;
    }
	
	//This function clears the rectangle at the current position
	this.clear = function(xPos,yPos){
		    ctx.clearRect(that.left, that.top, that.width, that.height);
	}
	
	//This function render the rectangle at the current position
    this.render = function (xPos, yPos) {
        ctx.fillStyle = "#000";
        ctx.fillRect(this.left, this.top, this.width, this.height);
        ctx.fillStyle = "#fff";
        ctx.fillText(that.value[0] + "," + that.value[1], this.left + 10, this.top + 12, 20);
        ctx.stroke();
    }
    this.animate = function (xPos, yPos) {
        that.clear(xPos,yPos);
		that.update(xPos, yPos);
		that.render(xPos, yPos);
        setTimeout(function () {

            that.intervalID = requestAnimationFrame(function () { that.animate(xPos, yPos) });
            //setInterval(function(){that.animate(sposX,posY)},500);
            // animating/drawing code goes here


        }, 1000 / framesPerSecond);

    }
    this.test = function () {
        async_series(create, function () { console.log("final is here"); });
    }

    this.addFunction = function (value, direction, reference) {

        create[counter++] = (function (value, direction, reference) {
            return function (cb) {

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
                /*ctx.rect(positionX, positionY, 40, 20);
                ctx.fillStyle = "#330066";
                ctx.stroke();
                ctx.fillText(value, positionX + 10, positionY + 10, 20);
                */

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
                if (cb) cb();

            }
        })(value, direction, reference);
    }

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
     this.addFunction= function (value, reference) {
	create[counter++]=(function(value,reference){
		return function(cb){	

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
		ctx.fillStyle="#000";
        ctx.fillText(value, positionX, positionY - 35, 10);
        ctx.stroke();
        subTreePosition.push([positionX, positionY - 15]);

		 if (cb) cb();

            }
        })(value, reference);
    }
	
}

