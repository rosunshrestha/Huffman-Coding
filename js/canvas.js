
var c, ctx, t, positionX, positionY, subTreePosition, childTreePosition;

function Initialization() {

    c = document.getElementById("tree-canvas");
    ctx = c.getContext("2d");
    t = 0;
    positionX = 50;
    positionY = c.height - 100;
    //variable to store position of subtree parent node
    subTreePosition = new Array();
    //variable to store the two subtree which are a child subtree node
    childTreePosition = new Array();
}
function Rectangle() {
    //varible to store rightmost bottom leaf node
    var bottomPosition = positionX;
    this.top = positionY;
    this.bottom = this.top + 20;
    this.left = positionX;
    this.right = this.left + 40;

    var that = this;
    this.create = function (value, frequency, direction, reference) {
        //if(direction==0)
        if (reference == "bottom") {

            if (positionX > c.width - 30) {
                c.scrollWidth = "400px";
            }
            positionX = bottomPosition + 70;
            positionY = c.height - 100;
            if (direction == 0)
            { positionX += 30; }
            bottomPosition = positionX;
        }
        else if (reference == "left") {
            position = subTreePosition.shift();
            positionX = position[0] - 100;
            positionY = position[1] - 35;
        }
        else if (reference == "right") {
            position = subTreePosition.shift();
            positionX = position[0] + 50;
            positionY = position[1] - 35;
        }
        //ctx.rect(that.left,that.top,that.right,that.bottom);
        //ctx.rect(50,340,90,400);
        ctx.rect(positionX, positionY, 40, 20);
        //ctx.rect(130,130,190,190);
        ctx.stroke();

        ctx.fillStyle = "#00ff00";
        //ctx.fill();

        ctx.fillStyle = "#000000";
        ctx.fillText(value + "," + frequency, positionX + 10, positionY + 10, 20);
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
            positionX = positionX + 70;
            positionY -= 50;
        }
        if (reference == "right") {
            positionX = positionX + 35;
            positionY -= 85;
        }
        ctx.fillStyle = "#ff0000";
        ctx.beginPath();
        ctx.arc(positionX, positionY - 35, 20, 0, 2 * Math.PI);

        ctx.stroke();
        ctx.closePath();
        //ctx.fill();
        ctx.fillStyle = "#000000";
        ctx.fillText(value, positionX, positionY - 35, 10);
        subTreePosition.push([positionX, positionY - 15]);
    }
}
var init = new Initialization;







//Further Enhancement
/*
//setInterval(function() { console.log("x is ", positionX); }, 100);

function Async() {
	this.queue = [];
	
	var that = this;
	
	this.execute = function(finalcb) {
		async_series(that.queue, finalcb);
	}
	
	//This the function to execute the function in an array with certain Time interval for animation
    function async_series(fn_list, final_callback) {
		console.log("no timeout ", positionX);
		for (var i=0; i<fn_list.length; i++) {
			var temp = fn_list[i];
			temp();
		}
		final_callback();
		
		return;
		
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
                    }, 500);
                }
            };
            fn(callback);
        }
        else {
            final_callback(null); // no errors
        }
    }
}


	//Draws the initials position of the rectangles to recpective letters and their frequency
    this.draw = function () {
        ctx.fillStyle = "#000";
        ctx.fillRect(this.left, this.top, 40, 20);
        ctx.fillStyle = "#fff";
        ctx.fillText(that.value[0] + "," + that.value[1], positionX + 10, positionY + 12, 20);
        positionX += 41;
    }
	
	//This function specify the position of the rectangle to be rendered
    this.update = function (xPos, yPos) {

        if (count > 0) {
            if (that.left > xPos) {
                that.left -= 60;
                if (that.left < xPos)
                    that.left = xPos;

            }
            else {
                that.left += 100;
                if (that.left > xPos)
                    that.left = xPos;

            }
        }
        if (count > 0)
            that.top += 120;
        else
            that.top += 30;
        count++;
        if (that.top > yPos)
            that.top = yPos;

        if (that.left == xPos && that.top == yPos)
        {    window.cancelAnimationFrame(that.intervalID);

        positionX=that.left;
        positionY=that.top;
		}
	}
	
	//This function clears the rectangle at the current position
	this.clear = function(xPos,yPos){
		    ctx.clearRect(that.left, that.top, that.width, that.height);
	}
	
	//This function render the rectangle at the current position
    this.render = function (xPos, yPos) {
        ctx.fillStyle = "#000";
        ctx.fillRect(that.left, that.top, that.width, that.height);
       // positionX=that.left;
		//positionY=that.top;
		ctx.fillStyle = "#fff";
        ctx.fillText(that.value[0] + "," + that.value[1], that.left + 10, that.top + 12, 20);
        ctx.stroke();
    }
	
    //This function animate the rectangle through changing the position through certain interval
	this.animate = function (xPos, yPos) {
        that.clear(xPos,yPos);
		that.update(xPos, yPos);
		that.render(xPos, yPos);
        setTimeout(function () {

            that.intervalID = requestAnimationFrame(function () { that.animate(xPos, yPos) });

        }, 1000 / framesPerSecond);
    }
	
	
	
	//This is the call back function to be stored in create as a queue
    this.addFunction = function (value, direction, reference) {

        return (function (value, direction, reference) {
            return function (pos, cb) {
                if (reference == "bottom") {
                    positionX = bottomPosition + 70;
					console.log("change 1");
                    positionY = c.height - 100;
                    if (direction == 0)
                    { positionX += 55; console.log("change 2");}
                    bottomPosition = positionX;
                }
                else if (reference == "left") {
                    position = subTreePosition.shift();
                    positionX = position[0] - 100;console.log("change 3");
                    positionY = position[1] - 35;
                }
                else if (reference == "right") {
                    position = subTreePosition.shift();
                    positionX = position[0] + 50;console.log("change 4");
                    positionY = position[1] - 35;
                }

				
				//console.log(positionX+"and"+positionY);
                that.animate(positionX, positionY);
				//console.log(positionX+"and"+positionY);
                if (cb) cb();
				
				return {x: pos.x, y: pos.y};
            }
        })(value, direction, reference);
    }

}
*/
