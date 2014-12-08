// JavaScript Document

var position;
var bottomPosition;
/*var c= new Canvas();
function Canvas() {
  */  var c = document.getElementById("tree-canvas");
	var ctx = c.getContext("2d");
	var t = 0;
	var positionX=50;
	bottomPosition=positionX;
	var positionY=c.height-100;
	//ctx.arc(20,20,5,0,Math.PI,);
	//ctx.stroke();
	var subTreePosition=new Array();
	
//}

function Rectangle() {
    //this.position_top = positionY-positionY/10;
    //this.position_left = positionX-positionX/10;
    this.top = positionY;
    this.bottom = this.top+20;;
    this.left = positionX;
    this.right = this.left+40;
   var that = this;
    this.create = function (value, direction,reference) {
		
		//if(direction==0)
		if(reference=="bottom")
		{			
			positionX+=50;bottomPosition+50;
			positionY=c.height-100;
			//bottomPosition=positionX;
		}
		else if(reference=="left")
		{
			position=subTreePosition.shift();	
			positionX=position[0]-120;
			positionY=position[1]-30;
			
		}
		else if(reference=="right")
		{
			position=subTreePosition.shift();
			positionX=position[0]+120;
			positionY=position[1]-30;
		}
		//ctx.rect(that.left,that.top,that.right,that.bottom);
        //ctx.rect(50,340,90,400);
		
		ctx.rect(positionX,positionY,40,20);
        //ctx.rect(130,130,190,190);
        ctx.fillText(value,positionX+10,positionY+10,20);
		ctx.stroke();
		/*if(direction==0)
		{
			positionY=that.top;
			positionX=that.right+70;
		}
		if(direction==1)
		{
			positionY=that.top;
			positionX=that.left;
			var rline=new Line();
			rline.create(1);
			console.log("test");
			positionX-=70;
			var lline=new Line();
			lline.create(0);
			positionX+=35;
			positionY-=35;
		}*/
		
	}
}

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
	this.create=function(direction){
		ctx.moveTo(positionX,positionY);
		if(direction==0)
		ctx.lineTo(positionX+35,positionY-30);
		else
		ctx.lineTo(positionX-35,positionY-30);
		ctx.stroke();
	}
}

function Circle(){
	this.top = t;
    this.bottom = 50;
    this.left = t;
    this.right = 90;
	this.create=function(value,reference){
		
		
		if(reference=="top")
		{
			position=subTreePosition.shift();
			positionX=position[0]+50;
			positionY=position[1]-50;	
			position=subTreePosition.shift();
		}
		ctx.beginPath();
		ctx.arc(positionX,positionY-35,20,0,2*Math.PI);
		ctx.fillText(value,positionX,positionY-35,10);
		ctx.stroke();
		subTreePosition.push([positionX,positionY-15]);
		
		
	}
}

